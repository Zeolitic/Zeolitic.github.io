import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-work-card',
  templateUrl: './work-card.component.html',
  styleUrls: ['./work-card.component.scss']
})
export class WorkCardComponent {
  @Input() title: string = "";
  @Input() subtitle: string = "";
  @Input() body: string[] | string = "";

  isArray(body: string[] | string){
    return Array.isArray(body);
  }
}
