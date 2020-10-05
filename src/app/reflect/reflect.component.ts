import { Component, OnInit } from '@angular/core';
import * as p5 from 'p5';

@Component({
  selector: 'app-reflect',
  templateUrl: './reflect.component.html',
  styleUrls: ['./reflect.component.scss']
})
export class ReflectComponent implements OnInit {

  private p5;

  constructor() { }

  ngOnInit() {
    this.createCanvas();
  }

  private createCanvas() {
    this.p5 = new p5(this.sketch);
  }

  private sketch(p: any) {

    // helper functions
    function dist(a, b) {return Math.sqrt(sqr(a.x - b.x) + sqr(a.y - b.y))}
    function sqr(x) { return x * x; }
    function dist2(v, w) { return sqr(v.x - w.x) + sqr(v.y - w.y); }
    function distToSegmentSquared(p, v, w) {
      const l2 = dist2(v, w);
      if (l2 === 0) return dist2(p, v);
      let t = ((p.x - v.x) * (w.x - v.x) + (p.y - v.y) * (w.y - v.y)) / l2;
      t = Math.max(0, Math.min(1, t));
      return dist2(p, { x: v.x + t * (w.x - v.x),
                        y: v.y + t * (w.y - v.y) });
    }
    function distToSegment(p, v, w) { return Math.sqrt(distToSegmentSquared(p, v, w)); }
    function average(x, y) {
      const val = Math.sqrt(x * x + y * y) + x / 10 + y / 10;
      return p.map(val, 0, 360, 0, 255);
    }
    function area(x1, y1, x2, y2, x3, y3) {return Math.abs((x1 * (y2 - y3) + x2 * (y3 - y1) + x3 * (y1 - y2)) / 2.0);}
    function isInside(x1, y1, x2, y2, x3, y3, x, y) {
       /* Calculate area of triangle ABC */
       const A = area (x1, y1, x2, y2, x3, y3);

       /* Calculate area of triangle PBC */
       const A1 = area (x, y, x2, y2, x3, y3);

       /* Calculate area of triangle PAC */
       const A2 = area (x1, y1, x, y, x3, y3);

       /* Calculate area of triangle PAB */
       const A3 = area (x1, y1, x2, y2, x, y);

       /* Check if sum of A1, A2 and A3 is same as A */
       return (Math.abs(A - (A1 + A2 + A3)) <= 0.01);
    }
    function sleep(ms) {return new Promise(resolve => setTimeout(resolve, ms)); }

    p.setup = async () => {

      const url = 'http://colormind.io/api/';
      const data = {
        model : 'default',
        input : ['N', 'N']
      };

      const http = new XMLHttpRequest();

      http.onreadystatechange = function() {
        if (http.readyState === 4 && http.status === 200) {
          const pallet = JSON.parse(http.responseText).result;
          color = pallet;
        }
      };

      http.open('POST', url, true);
      http.send(JSON.stringify(data));

      let counter = 0;

      // hard code colors here
      const colorArr = [
        [[125, 250, 250], [255, 150, 255]],
        [[240, 10, 60], [5, 78, 252]],
        [[240, 10, 60], [250, 230, 15]],
        [[247, 72, 72], [86, 209, 133]],
        null];
      let color = colorArr[Math.floor(Math.random() * colorArr.length)];


      while (color == null) {
        await sleep(1000);
        if (counter >= 5) {
          color = colorArr[Math.floor(Math.random() * colorArr.length)];
        }
        counter ++;
      }

      const fuzz = 300;

      p.createCanvas(400, 600);
      p.background(0);

      // three points to connect lines
      const p1 = {x: p.random(p.width), y: p.random(p.height)};
      const p2 = {x: p.random(p.width), y: p.random(p.height)};
      let p3 = {x: p.random(p.width), y: p.random(p.height)};

      while (dist(p2, p3) <= 250) {
        p3 = {x: p.random(p.width), y: p.random(p.height)};
      }



      // generate the first image
      p.loadPixels();
      for (let x = 0 ; x < p.width; x++) {
        for (let y = 0 ; y < p.height; y++) {
          const num = distToSegment({x, y}, p1, p2) / p.random(0.75, 1);

          const alpha = p.map(num, 0, fuzz, 255, 0);


          const r = p.map(alpha, 0, 255, 0, color[0][0]);
          const g = p.map(alpha, 0, 255, 0, color[0][1]);
          const b = p.map(alpha, 0, 255, 0, color[0][2]);

          const c = p.color(r, g, b);
          p.set(x, y, c);
          }
      }
      p.updatePixels();

      // save it and clear the background
      const img1 = p.get();
      p.background(0);


      // generate the second image
      p.loadPixels();
      for (let x = 0 ; x < p.width; x++) {
        for (let y = 0 ; y < p.height; y++) {
          const num = distToSegment({x, y}, p3, p2) / p.random(0.75, 1);

          const alpha = p.map(num, 0, fuzz, 255, 0);


          const r = p.map(alpha, 0, 255, 0, color[1][0]);
          const g = p.map(alpha, 0, 255, 0, color[1][1]);
          const b = p.map(alpha, 0, 255, 0, color[1][2]);

          const c = p.color(r, g, b);
          p.set(x, y, c);
          }
      }
      p.updatePixels();

      // save it and clear the background
      const img2 = p.get();
      p.background(0);

      // combine the images
      p.loadPixels();
      for (let x = 0 ; x < p.width; x++) {
        for (let y = 0 ; y < p.height; y++) {
          const c1 = img1.get(x, y);
          const c2 = img2.get(x, y);

          const c = p.color(average(c1[0], c2[0]), average(c1[1], c2[1]), average(c1[2], c2[2]));

          p.set(x, y, c);
          }
      }
      p.updatePixels();


      // calc slope of lines
      const m1 = (p2.y - p1.y) / (p2.x - p1.x);
      const b1 = p1.y - m1 * p1.x;

      const m2 = (p3.y - p2.y) / (p3.x - p2.x);
      const b2 = p2.y - m2 * p2.x;


      // find direction we should be moving on line
      const x1 = p1.x + 10;
      const x2 = p1.x - 10;

      const y1 = m1 * x1 + b1;
      const y2 = m1 * x2 + b1;

      const x3 = p3.x + 10;
      const x4 = p3.x - 10;

      const y3 = m2 * x3 + b2;
      const y4 = m2 * x4 + b2;


      // calculate distance to the points to see the dist we need
      const d1 = dist({x: x1, y: y1}, {x: p2.x, y: p2.y});
      const d2 = dist({x: x2, y: y2}, {x: p2.x, y: p2.y});

      const d3 = dist({x: x3, y: y3}, {x: p2.x, y: p2.y});
      const d4 = dist({x: x4, y: y4}, {x: p2.x, y: p2.y});

      let pointX1;
      let pointX2;

      if (d1 < d2) {
        pointX1 = -(p.width * 10);
      } else {
        pointX1 = (p.width * 10);
      }

      if (d3 < d4) {
        pointX2 = -(p.width * 10);
      } else {
        pointX2 = (p.width * 10);
      }

      // these are arbitraly far points that create a triangle for the "inside"
      const pointY1 = m1 * pointX1 + b1;
      const pointY2 = m2 * pointX2 + b2;


      p.strokeWeight(1);
      p.stroke(0, 0, 0, 75);
      p.fill(0, 0, 0, 75)


      // get len of line to know when to fade the shading
      const len1 = dist(p1, p2);
      const len2 = dist(p2, p3);

      const avgLen = (len1 + len2) / 2;

      for (let x = 0 ; x < p.width; x++) {
        for (let y = 0 ; y < p.height; y++) {

          // get the distance to the center
          const d = dist({x, y}, p2);
          // scale dist according to len into alpha val
          const val = p.map(d, 0, avgLen, 125, 0);

          const c = p.color(0, 0, 0, val);
          p.stroke(c);

          // only if outside of triangle do we want to shade
          if (!isInside(pointX1, pointY1, pointX2, pointY2, p2.x, p2.y, x, y)) {
           p.point(x, y);
          }
        }
      }
    };
  }
}

