import { Component, OnInit } from '@angular/core';
import * as p5 from 'p5';

@Component({
  selector: 'app-raindrop',
  templateUrl: './raindrop.component.html',
  styleUrls: ['./raindrop.component.scss']
})
export class RaindropComponent implements OnInit {

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

    let cols;
    let rows;
    let current;
    let previous;

    const damping = 0.99;


    p.setup = () => {
      p.pixelDensity(1);
      const canvas = p.createCanvas(600, 400);
      canvas.parent('sketch-holder');
      p.background(0);

      cols = p.width;
      rows = p.height;

      current = new Array(cols).fill(0).map(n => new Array(rows).fill(0));
      previous = new Array(cols).fill(0).map(n => new Array(rows).fill(0));

    };

    p.mouseClicked = () => {
      current[p.mouseX][p.mouseY] = 500;
    };



    p.draw = () => {

      p.random(1) > 0.90 ? current[1 + p.floor(p.random(p.width - 2))][1 + p.floor(p.random(p.height - 2))] = 500 : undefined ;


      p.loadPixels();

      for (let i = 1; i < cols - 1; i++) {
        for (let j = 1; j < rows - 1; j++) {

          current[i][j] = (previous[i - 1][j] + previous[i + 1][j] + previous[i][j + 1] + previous[i][j - 1]) / 2 - current[i][j];
          current[i][j] = current[i][j] * damping;

          const index = (i + j * cols) * 4;
          p.pixels[index + 0] = current[i][j];
          p.pixels[index + 1] = current[i][j];
          p.pixels[index + 2] = current[i][j];
        }
      }

      p.updatePixels();

      const temp = previous;
      previous = current;
      current = temp;

    };
  }

}
