import { Component } from '@angular/core';

import * as THREE from "three";
import { Base3DRendererComponent } from '../base-3d-renderer.component';

@Component({
  selector: 'app-car',
  templateUrl: './car.component.html'
})
export class CarComponent extends Base3DRendererComponent {

  protected override createScene() {
    this.scene = new THREE.Scene();

    // Add lighting
    this.scene.add(new THREE.AmbientLight(0xffffff, 0.35));
    const directionalLight = new THREE.DirectionalLight(0xffffff, 0.7);
    directionalLight.position.set(0,0,15);
    this.scene.add(directionalLight);

    this.loader.load("/assets/3d_models/f1_2022_car/scene.gltf", (gltf => {
      this.scene.add(gltf.scene)
    }));
  }
}
