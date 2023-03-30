import { Component, Input, OnInit } from '@angular/core';
import { Project } from '../projects/projects.component';

@Component({
  selector: 'app-project-card',
  templateUrl: './project-card.component.html',
  styleUrls: ['./project-card.component.scss']
})
export class ProjectCardComponent {
  @Input() value!: Project;

  goToLink(url: string) {
    window.open(url, "_blank");
  }
}
