import { AfterViewInit, Component, ElementRef, Input, OnInit, ViewChild } from '@angular/core';
import { DecalGeometry } from 'three/examples/jsm/geometries/DecalGeometry.js';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls';

import * as THREE from "three";

@Component({
  selector: 'app-tech-sphere',
  templateUrl: './tech-sphere.component.html',
  styleUrls: ['./tech-sphere.component.scss']
})
export class TechSphereComponent implements AfterViewInit {

  @ViewChild('canvas') private canvasRef!: ElementRef;

  private geometry = new THREE.IcosahedronGeometry(1, 1);
  private mesh!: THREE.Mesh;

  @Input() public set texture(path: string) {

    const material = new THREE.MeshStandardMaterial({
      map: new THREE.TextureLoader().load(path),
      flatShading: true
    });
    this.mesh = new THREE.Mesh(this.geometry, material);
  }


  @Input() public cameraZ: number = 400
  @Input() public fieldOfView: number = 1
  @Input() public nearClippingPlane: number = 1
  @Input() public farClippingPlane: number = 100000




  private movingRight = true;

  private camera!: THREE.PerspectiveCamera;
  private controls!: OrbitControls;

  private renderer!: THREE.WebGLRenderer;

  private clock = new THREE.Clock();

  private scene!: THREE.Scene;

  private get canvas(): HTMLCanvasElement {
    return this.canvasRef.nativeElement;
  }

  private createScene() {
    this.scene = new THREE.Scene();

    this.scene.add(new THREE.AmbientLight(0xffffff, 0.35));
    const directionalLight = new THREE.DirectionalLight(0xffffff, 0.7);
    directionalLight.position.set(0,0,15);
    this.scene.add(directionalLight);

    let aspectRatio = this.getAspectRatio();
    this.camera = new THREE.PerspectiveCamera(
      this.fieldOfView,
      aspectRatio,
      this.nearClippingPlane,
      this.farClippingPlane
    );
    this.camera.position.z = this.cameraZ - 250;

    this.scene.add(this.mesh);
  }

  private getAspectRatio() {
    return this.canvas.clientWidth / this.canvas.clientHeight;
  }

  private rotationStartPoint = (Math.random() * (0.005 - 0.01) + 0.01);
  private oscillationStartPoint = (Math.random() * (1 - 10) + 10);

  private animateSphere() {
    const time = this.clock.getElapsedTime();
    this.mesh.position.y = (Math.cos(time + this.oscillationStartPoint) * 0.2);

    if(this.mesh.rotation.y <= (Math.PI / 8)){
      this.movingRight = true;
    }else if(this.mesh.rotation.y >= 7 * (Math.PI / 8)){
      this.movingRight = false;
    }

    if(this.movingRight){
      this.mesh.rotation.y += this.rotationStartPoint;
    }else {
      this.mesh.rotation.y -= this.rotationStartPoint;
    }
  }

  private startRenderingLoop() {
    this.renderer = new THREE.WebGLRenderer({canvas: this.canvas, preserveDrawingBuffer: true, antialias: true, powerPreference: "high-performance", alpha: true});
    this.renderer.setPixelRatio(devicePixelRatio);
    this.renderer.setSize(this.canvas.clientWidth, this.canvas.clientHeight);

    this.controls = new OrbitControls(this.camera, this.renderer.domElement);
    this.controls.rotateSpeed = 1;
    this.controls.autoRotate = false;
    this.controls.enableZoom = false;
    this.controls.maxPolarAngle = Math.PI / 2;
    this.controls.minPolarAngle = Math.PI / 2;
    this.controls.enablePan = false;

    let component: TechSphereComponent = this;
    (function render() {
      requestAnimationFrame(render);
      component.controls.update()
      component.animateSphere();
      component.renderer.render(component.scene, component.camera);
    }());

  }

  ngAfterViewInit() {
    this.createScene();
    this.startRenderingLoop();
  }

}
