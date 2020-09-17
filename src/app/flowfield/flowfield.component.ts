import { Component, OnInit } from '@angular/core';
import * as p5 from 'p5';
import { Particle } from './particle';

@Component({
  selector: 'app-flowfield',
  templateUrl: './flowfield.component.html',
  styleUrls: ['./flowfield.component.scss']
})
export class FlowfieldComponent implements OnInit {

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

    const inc = 0.1;
    const scale = 20;
    let rows;
    let cols;

    let zoff = 0;

    let particles = [];

    let flowfield;

    p.setup = () => {
      p.createCanvas(800, 800);
      p.background(255);
      cols = p.floor(p.width / scale);
      rows = p.floor(p.height / scale);

      flowfield = new Array(cols * rows);

      for (let i = 0; i < 1000; i++) {
        particles.push(new Particle(p, cols, rows, scale));
      }

    };

    p.draw = () => {



      let yoff = 0;
      for (let y = 0; y < rows; y++) {
        let xoff = 0;
        for (let x = 0; x < cols; x++) {
          const index = x + y * cols;
          const angle = p.noise(xoff, yoff, zoff) * p.TWO_PI * 2;
          const v = p5.Vector.fromAngle(angle);
          flowfield[index] = v;

          xoff += inc;

        }
        yoff += inc;
      }

      zoff += 0.01;


      for (const particle of particles) {
        particle.follow(flowfield);
        particle.seperation(particles);
        particle.update();
        particle.wrap();
        particle.show();

      }

    };
  }

}
