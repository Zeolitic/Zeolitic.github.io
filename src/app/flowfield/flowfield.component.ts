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

    let checkbox;
    let button;

    p.setup = () => {
      const canvas = p.createCanvas(800, 800);
      canvas.parent('sketch-holder');
      p.background(255);
      cols = p.floor(p.width / scale);
      rows = p.floor(p.height / scale);
      p.colorMode(p.HSB);

      checkbox = p.createCheckbox('Colored Mode', false);
      checkbox.parent('sketch-holder');
      checkbox.changed(myCheckedEvent);

      button = p.createButton('Clear Page');
      button.parent('sketch-holder');
      button.mousePressed(myCheckedEventClear);

      flowfield = new Array(cols * rows);

      for (let i = 0; i < 1000; i++) {
        particles.push(new Particle(p, cols, rows, scale));
      }

    };

    function myCheckedEvent() {
      if (this.checked()) {
        for (const particle of particles) {
          particle.colFlag = true;
        }
        p.background(255);
      } else {
        for (const particle of particles) {
          particle.colFlag = false;
        }
        p.background(255);
      }
    }

    function myCheckedEventClear() {
      p.background(255);
    }

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
