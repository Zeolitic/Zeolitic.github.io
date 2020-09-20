import { Component, OnInit } from '@angular/core';
import * as p5 from 'p5';
import { Helper } from './helper';
import { Point } from './point';
import { Boundary } from './boundary';
import { Particle } from './particle';

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
    let walls: Boundary[] = [];
    let particle: Particle;

    let raycheckbox;
    let pointcheckbox;
    let bgcheckbox;

    let rayFlag = false;
    let pointFlag = false;
    let bgFlag = true;


    let button;

    p.setup = () => {
      p.createCanvas(800, 800);

      rows = p.floor(p.height / scale);
      cols = p.floor(p.width / scale);


      button = p.createButton('New');
      button.mousePressed(setup);


      raycheckbox = p.createCheckbox('Show Rays', false);
      raycheckbox.changed(rayToggle);

      pointcheckbox = p.createCheckbox('Show Points', false);
      pointcheckbox.changed(pointToggle);

      bgcheckbox = p.createCheckbox('Show Background', true);
      bgcheckbox.changed(bgToggle);


      particle = new Particle(p);

      setup();



    };


    function rayToggle() {
      rayFlag = !rayFlag;
    }

    function pointToggle() {
      pointFlag = !pointFlag;
    }

    function bgToggle() {
      bgFlag = !bgFlag;
    }

    function setup() {

      let empty1 = [];
      let empty2 = [];

      for (let x = 0; x < cols ; x++) {
        let tempArr = [];
        for (let y = 0; y < rows; y++) {

          if (x === 0 || x === cols - 1 || y === 0 || y === rows - 1) {
            tempArr.push(new Point(0));
          } else {
            tempArr.push(p.random(1) > 0.45 ? new Point(1) : new Point(0));
          }


        }
        empty1.push(tempArr);
      }

      for (let i = 0; i < 10; i++) {
        Helper.clean(empty1);
      }


      field = empty1;




      for (let i = 0; i < cols - 1 ; i++) {
        for (let j = 0; j < rows - 1; j++) {

          const xVal = i * scale;
          const yVal = j * scale;

          const a = {x: xVal + scale * 0.5, y: yVal              };
          const b = {x: xVal + scale      , y: yVal + scale * 0.5};
          const c = {x: xVal + scale * 0.5, y: yVal + scale      };
          const d = {x: xVal              , y: yVal + scale * 0.5};


          const state = 8 * field[i][j].val + 4 * field[i + 1][j].val + 2 * field[i + 1][j + 1].val + field[i][j + 1].val;


          switch (state) {
            case 1:
              empty2.push(new Boundary (p, c.x , c.y, d.x, d.y));
              break;
            case 2:
              empty2.push(new Boundary(p, b.x, b.y, c.x, c.y));
              break;
            case 3:
              empty2.push(new Boundary(p, d.x, d.y, b.x, b.y));
              break;
            case 4:
              empty2.push(new Boundary(p, a.x, a.y, b.x, b.y));
              break;
            case 5:
              empty2.push(new Boundary(p, b.x, b.y, c.x, c.y));
              empty2.push(new Boundary(p, a.x, a.y, d.x, d.y));
              break;
            case 6:
              empty2.push(new Boundary(p, a.x, a.y, c.x, c.y));
              break;
            case 7:
              empty2.push(new Boundary(p, a.x, a.y, d.x, d.y));
              break;
            case 8:
              empty2.push(new Boundary(p, a.x, a.y, d.x, d.y));
              break;
            case 9:
              empty2.push(new Boundary(p, a.x, a.y, c.x, c.y));
              break;
            case 10:
              empty2.push(new Boundary(p, d.x, d.y, c.x, c.y));
              empty2.push(new Boundary(p, a.x, a.y, b.x, b.y));
              break;
            case 11:
              empty2.push(new Boundary(p, a.x, a.y, b.x, b.y));
              break;
            case 12:
              empty2.push(new Boundary(p, d.x, d.y, b.x, b.y));
              break;
            case 13:
              empty2.push(new Boundary(p, c.x, c.y, b.x, b.y));
              break;
            case 14:
              empty2.push(new Boundary(p, c.x, c.y, d.x, d.y));
              break;
          }
        }
      }

      walls = empty2;

    }



    p.draw = () => {

      p.background(127);
      p.strokeWeight(1);


      if (bgFlag) {
        for (let i = 0; i < cols - 1 ; i++) {
          for (let j = 0; j < rows - 1; j++) {

            const xVal = i * scale;
            const yVal = j * scale;

            const a = {x: xVal , y: yVal              };
            const b = {x: xVal + scale      , y: yVal };
            const c = {x: xVal + scale , y: yVal + scale      };
            const d = {x: xVal              , y: yVal + scale};

            const state = 8 * field[i][j].val + 4 * field[i + 1][j].val + 2 * field[i + 1][j + 1].val + field[i][j + 1].val;

            p.stroke(0);
            p.fill(0);
            switch (state) {
              case 0:
                p.rect(a.x, a.y, scale, scale);
                break;
              case 1:
                p.triangle(a.x - scale * 0.5 , a.y, b.x, b.y, c.x, c.y + scale * 0.5);
                break;
              case 2:
                p.triangle(d.x , d.y + scale * 0.5, a.x, a.y, b.x + scale * 0.5, b.y);
                break;
              case 3:
                p.rect(a.x, a.y, scale, scale * 0.5);
                break;
              case 4:
                p.triangle(a.x, a.y - scale * 0.5, d.x, d.y, c.x  + scale * 0.5, c.y);
                break;
              case 5:
                p.triangle(d.x, d.y - scale * 0.5 , a.x, a.y, b.x - scale * 0.5, b.y) ;
                p.triangle(a.x, a.y, b.x - scale * 0.5, b.y, d.x, d.y - scale * 0.5);
                break;
              case 6:
                p.rect(a.x, a.y, scale * 0.5, scale);
                break;
              case 7:
                p.triangle(a.x, a.y, b.x - scale * 0.5, b.y, d.x, d.y - scale * 0.5);
                break;
              case 8:
                p.triangle(b.x, b.y - scale * 0.5, c.x, c.y, d.x - scale * 0.5, d.y);
                break;
              case 9:
                p.rect(a.x + 0.5 * scale, a.y, scale * 0.5, scale);
                break;
              case 10:
                p.triangle(a.x + scale * 0.5 , a.y, b.x, b.y, c.x, c.y -  scale * 0.5);
                p.triangle(a.x, a.y + scale * 0.5, d.x, d.y, c.x - scale * 0.5, c.y);
                break;
              case 11:
                p.triangle(a.x + 0.5 * scale, a.y, b.x, b.y, c.x, c.y - 0.5 * scale);
                break;
              case 12:
                p.rect(a.x, a.y + 0.5 * scale, scale, scale * 0.5);
                break;
              case 13:
                p.triangle(b.x, b.y + 0.5 * scale, c.x, c.y, d.x + 0.5 * scale, d.y);
                break;
              case 14:
                p.triangle(c.x - 0.5 * scale, c.y, d.x, d.y, a.x, a.y + 0.5 * scale);
                break;



            }
          }
        }

        p.rect(p.width - scale, 0, scale, p.height);
        p.rect(0, p.height - scale, p.width, scale);
      }




      if (pointFlag) {
        p.strokeWeight(4);
        for (let i = 0; i < cols ; i++) {
          let tempArr = field[i];
          for (let j = 0; j < rows; j++) {
            p.stroke(tempArr[j].val * 255);
            p.point(i * scale, j * scale);
          }
        }
      }


      for (const wall of walls) {
        wall.show();
      }

      if (rayFlag) {
        particle.update(p.mouseX, p.mouseY);
        particle.show();
        particle.look(walls);
      }


    };

  }

}

