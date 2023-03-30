import { AfterViewInit, Component, Directive, ElementRef, OnInit, ViewChild } from '@angular/core';

import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls';
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader';

import * as THREE from "three";
import { WebGLRendererParameters } from 'three';


@Directive()
export abstract class Base3DRendererComponent implements AfterViewInit {

  static constructDefaultWebGlRendererParams(canvas: HTMLCanvasElement) {
    return {canvas: canvas, preserveDrawingBuffer: true, antialias: true, powerPreference: "high-performance", alpha: true} as WebGLRendererParameters;
  }

  @ViewChild('canvas') private canvasRef!: ElementRef;
  protected get canvas(): HTMLCanvasElement {
    return this.canvasRef.nativeElement;
  }
  protected getAspectRatio() {
    return this.canvas.clientWidth / this.canvas.clientHeight;
  }

  protected cameraZ: number = 150
  protected fieldOfView: number = 2
  protected nearClippingPlane: number = 1
  protected farClippingPlane: number = 100000

  protected camera!: THREE.PerspectiveCamera;
  protected controls!: OrbitControls;
  protected loader = new GLTFLoader();
  protected renderer!: THREE.WebGLRenderer;

  protected scene!: THREE.Scene;

  protected createScene() {
    this.scene = new THREE.Scene();

    let aspectRatio = this.getAspectRatio();
    this.camera = new THREE.PerspectiveCamera(
      this.fieldOfView,
      aspectRatio,
      this.nearClippingPlane,
      this.farClippingPlane
    );
    this.camera.position.z = this.cameraZ;
  }

  protected createCamera() {
    let aspectRatio = this.getAspectRatio();
    this.camera = new THREE.PerspectiveCamera(
      this.fieldOfView,
      aspectRatio,
      this.nearClippingPlane,
      this.farClippingPlane
    );
    this.camera.position.z = this.cameraZ;
  }


  protected createRenderer() {
    this.renderer = new THREE.WebGLRenderer(Base3DRendererComponent.constructDefaultWebGlRendererParams(this.canvas));
    this.renderer.setPixelRatio(devicePixelRatio);
    this.renderer.setSize(this.canvas.clientWidth, this.canvas.clientHeight);
  }

  protected createControls() {
    this.controls = new OrbitControls(this.camera, this.renderer.domElement);
    this.controls.rotateSpeed = 1;
    this.controls.autoRotate = true;
    this.controls.enableZoom = false;
    this.controls.maxPolarAngle = Math.PI / 2;
    this.controls.minPolarAngle = Math.PI / 2;
    this.controls.enablePan = false;
  }

  protected startRenderingLoop() {
    let component: Base3DRendererComponent = this;
    (function render() {
      requestAnimationFrame(render);
      component.controls.update()
      component.renderer.render(component.scene, component.camera);
    }());
  }

  ngAfterViewInit(){
    this.createScene();
    this.createCamera();
    this.createRenderer();
    this.createControls();
    this.startRenderingLoop();
  }
}
