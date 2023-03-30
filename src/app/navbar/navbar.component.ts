import { Component } from '@angular/core';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss']
})
export class NavbarComponent {
  scrollToSection(anchor: string): void {
    document.getElementById(anchor)?.scrollIntoView({behavior: "smooth", block: "start", inline: "nearest"});
  }
}
