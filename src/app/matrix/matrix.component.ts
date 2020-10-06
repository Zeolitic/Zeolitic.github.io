import { Component, OnInit } from '@angular/core';
import * as p5 from 'p5';
import { Stream } from './stream';


@Component({
  selector: 'app-matrix',
  templateUrl: './matrix.component.html',
  styleUrls: ['./matrix.component.scss']
})
export class MatrixComponent implements OnInit {

  private p5;

  constructor() { }

  ngOnInit() {
    this.createCanvas();
  }

  private createCanvas() {
    this.p5 = new p5(this.sketch);
  }

  private sketch(p: any) {

    p.preload = () => {

    };


    let streams = [];
    let fadeInterval = 1.6;
    let symbolSize = 18;

    p.setup = () => {
      const canvas = p.createCanvas(800, 800);
      canvas.parent('sketch-holder');
      let x = 0;
      for (let i = 0; i <= p.width / symbolSize; i++) {
        let stream = new Stream(p, fadeInterval, symbolSize);
        stream.generateSymbols(x, p.random(-2000, 0));
        streams.push(stream);
        x += symbolSize;
      }

      p.textFont('Consolas');
      p.textSize(symbolSize);

    };

    p.draw = () => {
      p.background(0, 150);
      streams.forEach(function(stream) {
        stream.render();
      });
    };
  }

}
