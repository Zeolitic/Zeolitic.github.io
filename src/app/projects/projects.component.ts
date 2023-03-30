import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';

@Component({
  selector: 'app-projects',
  templateUrl: './projects.component.html',
  styleUrls: ['./projects.component.scss']
})
export class ProjectsComponent  {
  constructor(private readonly http: HttpClient) {}

  readonly projects$ = this.http.get<Project[]>('/assets/projects/projects.json');
}

export interface Project {
  title: string;
  description: string;
  technologies: string[];
  imagePath: string;
  logoPath?: string;
  siteLink?: string;
  githubLink?: string;
}
