import * as p5 from 'p5';
import { Ray } from './ray';

export class Particle {

  private p;

  private pos;
  private rays;

  constructor(p) {
    this.p = p;
    this.pos = this.p.createVector(this.p.width / 2, this.p.height / 2);
    this.rays = [];
    for (let a = 0; a < 360; a += 1) {
      this.rays.push(new Ray(this.p, this.pos, this.p.radians(a)));
    }
  }

  update(x, y) {
    this.pos.set(x, y);
  }

  look(walls) {
    for (let i = 0; i < this.rays.length; i++) {
      const ray = this.rays[i];
      let closest = null;
      let record = Infinity;
      for (let wall of walls) {
        const pt = ray.cast(wall);
        if (pt) {
          const d = p5.Vector.dist(this.pos, pt);
          if (d < record) {
            record = d;
            closest = pt;
          }
        }
      }
      if (closest) {
        // colorMode(HSB);
        // stroke((i + frameCount * 2) % 360, 255, 255, 50);
        this.p.stroke(255, 100);
        this.p.line(this.pos.x, this.pos.y, closest.x, closest.y);
      }
    }
  }

  show() {
    this.p.fill(255);
    this.p.ellipse(this.pos.x, this.pos.y, 4);
    for (let ray of this.rays) {
      ray.show();
    }
  }

}
