import { Component, ElementRef, Input, ViewChild } from '@angular/core';
import { TrackballControls } from 'three/examples/jsm/controls/TrackballControls';


import * as THREE from "three";
import { Group } from 'three';

@Component({
  selector: 'app-stars',
  templateUrl: './stars.component.html',
  styleUrls: ['./stars.component.scss']
})
export class StarsComponent {
  @ViewChild('canvas') private canvasRef!: ElementRef;

  private camera!: THREE.PerspectiveCamera;

  private get canvas(): HTMLCanvasElement {
    return this.canvasRef.nativeElement;
  }

  @Input() public fieldOfView: number = 1
  @Input() public nearClippingPlane: number = 1
  @Input() public farClippingPlane: number = 100000
  @Input() public cameraZ: number = 400


  private renderer!: THREE.WebGLRenderer;
  private scene!: THREE.Scene;

  private stars!: THREE.Points;

  private createScene() {

    this.scene = new THREE.Scene();

    //this.scene.background = new THREE.Color(0x000000);


    const vertices = [];
    for ( let i = 0; i < 100000; i ++ ) {
      const x = THREE.MathUtils.randFloatSpread(100);
      const y = THREE.MathUtils.randFloatSpread(100);
      const z = THREE.MathUtils.randFloatSpread(500);

      vertices.push( x, y, z );
    }

    const geometry = new THREE.BufferGeometry();
    geometry.setAttribute( 'position', new THREE.Float32BufferAttribute( vertices, 3 ) );

    const material = new THREE.PointsMaterial( { color: 0xffffff } );
    this.stars = new THREE.Points( geometry, material );
    this.stars.frustumCulled = true;
    this.scene.add( this.stars );



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

  private animateStars() {
    this.stars.rotateY(0.0001);
    this.stars.rotateX(0.00005);
  }

  private startRenderingLoop() {
    this.renderer = new THREE.WebGLRenderer({canvas: this.canvas, preserveDrawingBuffer: true, antialias: true, powerPreference: "high-performance", alpha: true});
    this.renderer.setPixelRatio(devicePixelRatio);
    this.renderer.setSize(this.canvas.clientWidth, this.canvas.clientHeight);


    let component: StarsComponent = this;
    (function render() {
      requestAnimationFrame(render);
      component.animateStars();
      component.renderer.render(component.scene, component.camera);
    }());
  }

  ngAfterViewInit() {
    this.createScene();
    this.startRenderingLoop();
  }

}
