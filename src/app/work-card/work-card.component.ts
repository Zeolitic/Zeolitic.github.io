import { Component, Input, OnInit } from '@angular/core';
import { Work } from '../work/work.component';

@Component({
  selector: 'app-work-card',
  templateUrl: './work-card.component.html',
  styleUrls: ['./work-card.component.scss']
})
export class WorkCardComponent {

  @Input() value!: Work;
  @Input() direction?: "left" | "right";

  isArray(body: string[] | string){
    return Array.isArray(body);
  }
}
