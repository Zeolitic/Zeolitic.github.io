import { Component, OnInit } from '@angular/core';
import * as p5 from 'p5';
import { Particle } from './particle';

@Component({
  selector: 'app-impressionism',
  templateUrl: './impressionism.component.html',
  styleUrls: ['./impressionism.component.scss']
})
export class ImpressionismComponent implements OnInit {


  private p5;

  constructor() { }

  ngOnInit() {
    this.createCanvas();
  }

  private createCanvas() {
    this.p5 = new p5(this.sketch);
  }

  private sketch(p: any) {

    let image = null;

    p.preload = () => {


      const canvas = p.createCanvas(800, 400);
      canvas.parent('sketch-holder');
      canvas.style('display', 'block');

      const seed = Math.floor(p.random(1, 1000000));
      const url = 'https://picsum.photos/seed/' + seed + '/' + p.width + '/' + p.height;

      const origImg = p.createImg(url);
      origImg.parent('sketch-holder');
      origImg.style('display', 'block');
      image = p.loadImage(url);
    };

    const scale = 10;
    let cols;
    let rows;
    let particles = [];
    let flowfield;

    let counter = 0;


    p.setup = () => {

      const canvas = p.createCanvas(800, 400);
      canvas.parent('sketch-holder');
      p.stroke(255);
      p.strokeWeight(4);
      p.background(0);

      cols = p.width / scale;
      rows = p.height / scale;

      flowfield = new Array(cols * rows);

      for (let i = 0; i < cols; i++) {
        for (let j = 0 ; j < rows; j++) {
          const c = image.get(i * scale, j * scale);
          particles.push(new Particle(p, i * scale, j * scale, c, cols, rows, scale));
        }
      }

    };




    p.draw = () => {

      counter += 1;

      p.strokeWeight(10);




      let yoff = 0;
      for (let y = 0; y < rows; y++) {
        let xoff = 0;
        for (let x = 0; x < cols; x++) {
          const index = x + y * cols;
          const angle = p.noise(xoff, yoff) * p.TWO_PI * 2;
          const v = p5.Vector.fromAngle(angle);
          flowfield[index] = v;

          xoff += 0.015;

        }
        yoff += 0.015;
      }


      for (const particle of particles) {
        particle.follow(flowfield);
        particle.update();
        particle.show();
      }

      if (counter >= 10) {
        p.noLoop();
      }



      //p.image(image, 0,0, p.width,p.height);


    };
  }

}
