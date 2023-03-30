import { Component, Input } from '@angular/core';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls';

import * as THREE from "three";
import { Base3DRendererComponent } from '../base-3d-renderer.component';

@Component({
  selector: 'app-tech-sphere',
  templateUrl: './tech-sphere.component.html'
})
export class TechSphereComponent extends Base3DRendererComponent {

  protected override fieldOfView = 1;

  private geometry = new THREE.IcosahedronGeometry(1, 1);
  private mesh!: THREE.Mesh;
  private clock = new THREE.Clock();

  @Input() public set texture(path: string) {
    const material = new THREE.MeshStandardMaterial({
      map: new THREE.TextureLoader().load(path),
      flatShading: true
    });
    this.mesh = new THREE.Mesh(this.geometry, material);
  }

  private movingRight = true;

  protected override createScene() {
    this.scene = new THREE.Scene();

    this.scene.add(new THREE.AmbientLight(0xffffff, 0.35));
    const directionalLight = new THREE.DirectionalLight(0xffffff, 0.7);
    directionalLight.position.set(0,0,15);
    this.scene.add(directionalLight);

    this.scene.add(this.mesh);
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

  protected override createControls() {
    this.controls = new OrbitControls(this.camera, this.renderer.domElement);
    this.controls.rotateSpeed = 1;
    this.controls.autoRotate = false;
    this.controls.enableZoom = false;
    this.controls.maxPolarAngle = Math.PI / 2;
    this.controls.minPolarAngle = Math.PI / 2;
    this.controls.enablePan = false;
  }

  protected override startRenderingLoop() {
    let component: TechSphereComponent = this;
    (function render() {
      requestAnimationFrame(render);
      component.controls.update()
      component.animateSphere();
      component.renderer.render(component.scene, component.camera);
    }());

  }
}
