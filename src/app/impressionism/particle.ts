import * as p5 from 'p5';

export class Particle {

private p;

  private pos;
  private radius;
  private color;
  private radiusTick;

  private prevPos;

  private vel;
  private acc;

  private cols;
  private rows;
  private scale;

  constructor(p, x, y, c, cols, rows, scale){

    this.p = p;

    this.pos = this.p.createVector(x, y);
    this.color = c;
    this.color[3] = p.random(125, 255);
    this.radius = Math.ceil(p.random(2, 15));

    this.cols = cols;
    this.rows = rows;
    this.scale = scale;

    this.vel = this.p.createVector(0, 0);
    this.acc = this.p.createVector(0, 0);

    this.prevPos = this.pos.copy();

  }

  applyForce(force) {
    this.acc.add(force);
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

  show() {
    this.p.strokeWeight(this.radius);
    this.p.stroke(this.color);
    this.p.line(this.pos.x, this.pos.y, this.prevPos.x, this.prevPos.y);
    this.updatePrev();
  }

  updatePrev() {
    this.prevPos.x = this.pos.x;
    this.prevPos.y = this.pos.y;
  }


}
