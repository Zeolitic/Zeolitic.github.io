import { Component, ElementRef, Input, ViewChild } from '@angular/core';

import { TrackballControls } from 'three/examples/jsm/controls/TrackballControls';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls';
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader';

import * as THREE from "three";
import { Group, PerspectiveCamera } from 'three';

@Component({
  selector: 'app-planet',
  templateUrl: './planet.component.html',
  styleUrls: ['./planet.component.scss']
})
export class PlanetComponent {

  @ViewChild('canvas') private canvasRef!: ElementRef;

  @Input() public rotationSpeedX: number = 0;
  @Input() public rotationSpeedY: number = 0.01;
  @Input() public cameraZ: number = 400
  @Input() public fieldOfView: number = 2
  @Input() public nearClippingPlane: number = 1
  @Input() public farClippingPlane: number = 100000


  private camera!: THREE.PerspectiveCamera;
  private controls!: OrbitControls;

  private get canvas(): HTMLCanvasElement {
    return this.canvasRef.nativeElement;
  }


  private bigBoiLoader = new GLTFLoader();



  private renderer!: THREE.WebGLRenderer;

  private scene!: THREE.Scene;

  private createScene() {
    this.scene = new THREE.Scene();
    // this.scene.background = new THREE.Color(0x22202f);
    //this.scene.add(new THREE.HemisphereLight( 0xffffff ));
    //this.scene.add(new THREE.DirectionalLight(0xffffff, 0.5));

    let component: PlanetComponent = this;
    this.bigBoiLoader.load("/assets/3d_models/planet/scene.gltf", function(gltf) {
      component.scene.add(gltf.scene)
    })

    //this.scene.add(this.cube);

    let aspectRatio = this.getAspectRatio();
    this.camera = new THREE.PerspectiveCamera(
      this.fieldOfView,
      aspectRatio,
      this.nearClippingPlane,
      this.farClippingPlane
    );
    this.camera.position.z = this.cameraZ - 250;

  }

  private getAspectRatio() {
    return this.canvas.clientWidth / this.canvas.clientHeight;
  }


  private startRenderingLoop() {
    this.renderer = new THREE.WebGLRenderer({canvas: this.canvas, preserveDrawingBuffer: true, antialias: true, powerPreference: "high-performance", alpha: true});
    this.renderer.setPixelRatio(devicePixelRatio);
    this.renderer.setSize(this.canvas.clientWidth, this.canvas.clientHeight);

    this.controls = new OrbitControls(this.camera, this.renderer.domElement);
    this.controls.rotateSpeed = 1;
    this.controls.autoRotate = true;
    this.controls.enableZoom = false;
    this.controls.maxPolarAngle = Math.PI / 2;
    this.controls.minPolarAngle = Math.PI / 2;
    this.controls.enablePan = false;

    let component: PlanetComponent = this;
    (function render() {
      requestAnimationFrame(render);
      component.controls.update()
      //component.animateCube();
      component.renderer.render(component.scene, component.camera);
    }());
  }

  ngAfterViewInit() {
    this.createScene();
    this.startRenderingLoop();
  }

}
