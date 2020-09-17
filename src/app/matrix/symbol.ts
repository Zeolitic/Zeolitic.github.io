export class Symbol {

  private p;

  private x;
  private y;
  private value;
  private speed;
  private first;
  private opacity;
  private switchInterval;

  constructor(p, x, y, speed, first, opacity) {
    this.p = p;
    this.x = x;
    this.y = y;

    this.speed = speed;
    this.first = first;
    this.opacity = opacity;

    this.switchInterval = this.p.round(this.p.random(2, 25));
  }

  setToRandomSymbol() {

    const charType = this.p.round(this.p.random(0, 5));
    if (this.p.frameCount % this.switchInterval === 0) {
      if (charType > 1) {
        // set it to Katakana
        this.value = String.fromCharCode(
          0x0020 + this.p.floor(this.p.random(0, 95))


        );
      } else {
        // set it to numeric
        this.value = this.p.floor(this.p.random(0, 10));
      }
    }
  }

  rain() {
    this.y = (this.y >= this.p.height) ? 0 : this.y += this.speed;
  }

}
