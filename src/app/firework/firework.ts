import { Particle } from './particle';

export class Firework {

private p;

private firework;
private gravity;
private exploded = false;
private particles = [];
private hu;
private heartFlag;

  constructor(p, flag) {
    this.p = p;
    this.heartFlag = flag;
    this.gravity = this.p.createVector(0, 0.2);
    this.firework = new Particle(p, p.random(p.width), p.height, true, this.hu, this.heartFlag);
    this.hu = this.p.random(255);
  }

  update() {
    if (!this.exploded) {
      this.firework.update();
      this.firework.applyForce(this.gravity);

      if (this.firework.vel.y >= 0) {
        this.exploded = true;
        this.explode();
      }
    }

    for (let i = this.particles.length - 1; i >= 0; i--) {
      this.particles[i].applyForce(this.gravity);
      this.particles[i].update();
      if (this.particles[i].done()) {
        this.particles.splice(i, 1);
      }
    }

  }

  done() {
    return this.exploded && this.particles.length === 0;
  }

  explode() {
    // "density" is here
    for (let i = 0 ; i < this.p.random(50, 100); i++) {
      this.particles.push(new Particle(this.p, this.firework.pos.x, this.firework.pos.y, false, this.hu, this.heartFlag));
    }
  }

  show() {
    if (!this.exploded) {
      this.firework.show();
    }

    for (const particle of this.particles) {
      particle.show();
    }

  }
}
