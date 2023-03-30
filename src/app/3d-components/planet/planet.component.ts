import { Component } from '@angular/core';

import * as THREE from "three";
import { Base3DRendererComponent } from '../base-3d-renderer.component';

@Component({
  selector: 'app-planet',
  templateUrl: './planet.component.html'
})
export class PlanetComponent extends Base3DRendererComponent {

  protected override createScene() {
    this.scene = new THREE.Scene();

    this.loader.load("/assets/3d_models/planet/scene.gltf", (gltf => {
      this.scene.add(gltf.scene)
    }));
  }
}
