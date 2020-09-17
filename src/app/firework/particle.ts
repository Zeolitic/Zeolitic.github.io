import * as p5 from 'p5';

export class Particle {

  private p;

  private pos;
  private vel;
  private acc;
  private hu;
  private heartFlag;

  private lifespan = 255;

  private fireworkFlag;

  constructor(p, x, y, flag, hu, hFlag) {
    this.p = p;
    this.hu = hu;
    this.heartFlag = hFlag;
    this.fireworkFlag = flag;
    this.pos = this.p.createVector(x, y);
    if (this.fireworkFlag) {
      // height is here
      this.vel = this.p.createVector(this.p.random(-1, 1), this.p.random(-7, -12));
    } else {


      if (hFlag) {
        const i = this.p.random(0, 360);
        // do the shape of fireworks here
        // size is here
        const xVel = 16 * Math.pow(Math.sin(i), 3);
        const yVel = 13 * Math.cos(i) - 5 * Math.cos(2 * i) - 2 * Math.cos(3 * i) - Math.cos(4 * i);
        this.vel = this.p.createVector(xVel, -yVel);
        this.vel.mult(0.5);
      } else {
        this.vel = p5.Vector.random2D();
        this.vel.mult(this.p.random(1, 6));
      }

    }

    this.acc = this.p.createVector(0, 0);
  }


  applyForce(force) {
    this.acc.add(force);
  }

  done() {
    return this.lifespan < 0;
  }

  update() {

    if (!this.fireworkFlag) {
      this.vel.mult(0.95);
      this.lifespan -= this.p.random(-1, 10);
    }

    this.vel.add(this.acc);
    this.pos.add(this.vel);
    this.acc.mult(0);
  }


  show() {
    if (!this.fireworkFlag) {
      this.p.strokeWeight(2);
      this.p.stroke(this.hu, 255, 255, this.lifespan);
    } else {
      this.p.strokeWeight(4);
      this.p.stroke(this.hu, 255, 255);
    }

    this.p.point(this.pos.x, this.pos.y);
  }

}
