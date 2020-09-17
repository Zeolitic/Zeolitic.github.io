import * as p5 from 'p5';

export class Particle {

  private p;

  private pos;
  private vel;
  private acc;

  private prevPos;

  private cols;
  private rows;
  private scale;

  constructor(p, c, r, s) {
    this.p = p;
    this.cols = c;
    this.rows = r;
    this.scale = s;

    this.pos = this.p.createVector(p.random(p.width), p.random(p.height));
    this.vel = this.p.createVector(0, 0);
    this.acc = this.p.createVector(0, 0);
    this.prevPos = this.pos.copy();
  }

  update() {
    this.vel.add(this.acc);
    this.pos.add(this.vel);
    this.acc.mult(0);
  }

  follow(vectors) {
    const x = this.p.floor(this.pos.x / this.scale);
    const y = this.p.floor(this.pos.y / this.scale);
    const index = x + y * this.cols;
    this.applyForce(vectors[index]);
  }

  seperation(particles) {
    const perceptionRadius = 1;
    const steering = this.p.createVector();
    const total = 0;

    for (const particle of particles) {
      const d = this.dumbDistance(this.pos, particle.pos);

      if (particle !== this && d < perceptionRadius * perceptionRadius * 2) {
        const diff = p5.Vector.sub(this.pos, particle.pos);
        diff.div(d);
        steering.add(diff);
      }
    }

    this.applyForce(steering);

  }

  dumbDistance(a, b) {
    const dx = b.x - a.x;
    const dy = b.y - a.y;
    return dx * dx + dy * dy;
  }

  applyForce(force) {
    this.acc.add(force);
    this.vel.limit(5);
  }

  show() {
    this.p.stroke(0, 5);
    this.p.strokeWeight(1);
    this.p.line(this.pos.x, this.pos.y, this.prevPos.x, this.prevPos.y);
    this.updatePrev();
    // this.p.point(this.pos.x, this.pos.y);
  }

 updatePrev() {
   this.prevPos.x = this.pos.x;
   this.prevPos.y = this.pos.y;
 }

  wrap() {
    if (this.pos.x > this.p.width) {
      this.pos.x = 0;
      this.updatePrev();
    } else if (this.pos.x < 0) {
      this.pos.x = this.p.width;
      this.updatePrev();
    } else if (this.pos.y > this.p.height) {
      this.pos.y = 0;
      this.updatePrev();
    } else if (this.pos.y < 0) {
      this.pos.y = this.p.height;
      this.updatePrev();
    }
  }

}
