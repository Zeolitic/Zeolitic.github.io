import { Component, OnInit } from '@angular/core';
import * as p5 from 'p5';
import { Helper } from './helper';
import { Point } from './point';

@Component({
  selector: 'app-marchingsquares',
  templateUrl: './marchingsquares.component.html',
  styleUrls: ['./marchingsquares.component.scss']
})
export class MarchingsquaresComponent implements OnInit {

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

    const scale = 10;

    let rows;
    let cols;
    let field: Point[][] = [];
    let lines: any[][];

    let button;

    p.setup = () => {
      p.createCanvas(800, 800);

      rows = p.floor(p.height / scale);
      cols = p.floor(p.width / scale);


      button = p.createButton('New');
      button.mousePressed(clickEvent);

      for (let x = 0; x < cols ; x++) {
        let tempArr = [];
        for (let y = 0; y < rows; y++) {

          if (x === 0 || x === cols - 1 || y === 0 || y === rows - 1) {
            tempArr.push(new Point(0));
          } else {
            tempArr.push(p.random(1) > 0.45 ? new Point(1) : new Point(0));
          }


        }
        field.push(tempArr);
      }

      for (let i = 0; i < 10; i++) {
        Helper.clean(field);
      }

    };

    function clickEvent() {
      let replacearr = [];
      for (let x = 0; x < cols ; x++) {
        let tempArr = [];
        for (let y = 0; y < rows; y++) {

          if (x === 0 || x === cols - 1 || y === 0 || y === rows - 1) {
            tempArr.push(new Point(0));
          } else {
            tempArr.push(p.random(1) > 0.45 ? new Point(1) : new Point(0));
          }


        }
        replacearr.push(tempArr);
      }

      for (let i = 0; i < 10; i++) {
        Helper.clean(replacearr);
      }

      field = replacearr;


    }


    p.draw = () => {

      p.background(127);
      p.strokeWeight(scale * 0.4);

      for (let i = 0; i < cols ; i++) {
        let tempArr = field[i];
        for (let j = 0; j < rows; j++) {
          p.stroke(tempArr[j].val * 255);
          p.point(i * scale, j * scale);
        }
      }

      for (let i = 0; i < cols - 1 ; i++) {
        for (let j = 0; j < rows - 1; j++) {

          const xVal = i * scale;
          const yVal = j * scale;

          const a = {x: xVal + scale * 0.5, y: yVal              };
          const b = {x: xVal + scale      , y: yVal + scale * 0.5};
          const c = {x: xVal + scale * 0.5, y: yVal + scale      };
          const d = {x: xVal              , y: yVal + scale * 0.5};


          const state = 8 * field[i][j].val + 4 * field[i + 1][j].val + 2 * field[i + 1][j + 1].val + field[i][j + 1].val;

          p.strokeWeight(1);
          p.stroke(255);

          switch (state) {
            case 1:
              p.line(c.x, c.y, d.x, d.y);
              break;
            case 2:
              p.line(b.x, b.y, c.x, c.y);
              break;
            case 3:
              p.line(d.x, d.y, b.x, b.y);
              break;
            case 4:
              p.line(a.x, a.y, b.x, b.y);
              break;
            case 5:
              p.line(b.x, b.y, c.x, c.y);
              p.line(a.x, a.y, d.x, d.y);
              break;
            case 6:
              p.line(a.x, a.y, c.x, c.y);
              break;
            case 7:
              p.line(a.x, a.y, d.x, d.y);
              break;
            case 8:
              p.line(a.x, a.y, d.x, d.y);
              break;
            case 9:
              p.line(a.x, a.y, c.x, c.y);
              break;
            case 10:
              p.line(d.x, d.y, c.x, c.y);
              p.line(a.x, a.y, b.x, b.y);
              break;
            case 11:
              p.line(a.x, a.y, b.x, b.y);
              break;
            case 12:
              p.line(d.x, d.y, b.x, b.y);
              break;
            case 13:
              p.line(c.x, c.y, b.x, b.y);
              break;
            case 14:
              p.line(c.x, c.y, d.x, d.y);
              break;
          }
        }
      }


    };

  }

}

