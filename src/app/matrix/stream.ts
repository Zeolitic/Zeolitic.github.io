import { Symbol } from './symbol';

export class Stream {

  private p;

  private symbols;
  private totalSymbols;
  private speed;
  private fadeInterval;
  private symbolSize;

  constructor(p, fade, symbol) {
    this.p = p;
    this.fadeInterval = fade;
    this.symbolSize = symbol;
    this.symbols = [];
    this.totalSymbols = p.round(p.random(5, 35));
    this.speed = p.random(5, 22);
  }

  generateSymbols(x, y) {
    let opacity = 255;
    let first = this.p.round(this.p.random(0, 4)) === 1;
    for (let i = 0; i <= this.totalSymbols; i++) {
      let symbol = new Symbol(this.p, x, y, this.speed, first, opacity);
      symbol.setToRandomSymbol();
      this.symbols.push(symbol);
      opacity -= (255 / this.totalSymbols) / this.fadeInterval;
      y -= this.symbolSize;
      first = false;
    }
  }


  render() {

    let $ = this;

    this.symbols.forEach(function(symbol) {
      if (symbol.first) {
        $.p.fill(140, 255, 170, symbol.opacity);
      } else {
        $.p.fill(0, 255, 70, symbol.opacity);
      }
      $.p.text(symbol.value, symbol.x, symbol.y);
      symbol.rain();
      symbol.setToRandomSymbol();
    });
  }

}
