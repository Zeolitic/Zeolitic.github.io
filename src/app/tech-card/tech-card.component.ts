import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-tech-card',
  templateUrl: './tech-card.component.html',
  styleUrls: ['./tech-card.component.scss']
})
export class TechCardComponent {
  @Input() image: string = "";
  @Input() title: string = "";
  @Input() subtitle: string = "";
}
