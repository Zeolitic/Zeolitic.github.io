import { Component } from '@angular/core';

@Component({
  selector: 'app-projects',
  templateUrl: './projects.component.html',
  styleUrls: ['./projects.component.scss']
})
export class ProjectsComponent  {

  readonly projects = [
    {
      title: "F1L (F1 League)",
      description: "F1L provides a unique platform for racing enthusiasts to manage their own league of virtual racers and recruit new racers into their league. The easy to use interface allows you to create and customize your league, set up races, and track performance metrics with statistics retrived from the game.",
      technologies: ["Angular", "Spring", "PostgreSQL", "SCSS"],
      imagePath: "/assets/projects/F1L.png",
      logoPath: "/assets/projects/F1L_Logo.png",
      siteLink: "http://www.f1l.ca",
    },
    {
      title: "F1T (F1 Telemetry)",
      description: "F1T provides players with unparalleled insight into the performance of their vehicle and competitors, enabling them to gain a competitive edge like never before with features such as a car radar, opponents lap times, and gas/break input visualization. Designed with ease of use in mind, F1T's intuitive interface and customizable settings make it the perfect tool for players of all levels.",
      technologies: ["C#", "WPF"],
      imagePath: "/assets/projects/F1T.png",
      logoPath: "/assets/projects/F1T_Logo.png",
      githubLink: "https://github.com/F1Telemetry/F1T",
    }
  ] as Project[];
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
