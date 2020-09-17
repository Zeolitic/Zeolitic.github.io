import { Component, OnInit } from '@angular/core';
import * as p5 from 'p5';
import { Firework } from './firework';

@Component({
  selector: 'app-firework',
  templateUrl: './firework.component.html',
  styleUrls: ['./firework.component.scss']
})
export class FireworkComponent implements OnInit {

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

    let fireworks = [];

    p.setup = () => {
      p.createCanvas(800, 400);
      p.colorMode(p.HSB);
      p.stroke(255);
      p.strokeWeight(4);
      p.background(0);

    };

    p.draw = () => {
      p.background(0, 0, 0, 0.25);

      if (fireworks.length <= 8) {
        if (p.random(1) < 0.05) {
          fireworks.push(new Firework(p, false));
        }
        if (p.random(1) < 0.005) {
          fireworks.push(new Firework(p, true));
        }
      }


      for (let i = fireworks.length - 1; i >= 0; i--) {
        fireworks[i].update();
        fireworks[i].show();

        if (fireworks[i].done()) {
          fireworks.splice(i, 1);
        }

      }
    };
  }

}
