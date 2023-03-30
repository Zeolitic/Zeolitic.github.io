import { Component, ElementRef, Input, ViewChild } from '@angular/core';

import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls';
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader';

import * as THREE from "three";

@Component({
  selector: 'app-car',
  templateUrl: './car.component.html',
  styleUrls: ['./car.component.scss']
})
export class CarComponent {

  @ViewChild('canvas') private canvasRef!: ElementRef;


  private cameraZ: number = 400
  private fieldOfView: number = 2
  private nearClippingPlane: number = 1
  private farClippingPlane: number = 100000


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

    this.scene.add(new THREE.AmbientLight(0xffffff, 0.35));
    const directionalLight = new THREE.DirectionalLight(0xffffff, 0.7);
    directionalLight.position.set(0,0,15);
    this.scene.add(directionalLight);

    let component: CarComponent = this;
    this.bigBoiLoader.load("/assets/3d_models/f1_2022_car/scene.gltf", function(gltf) {
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

    let component: CarComponent = this;
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
