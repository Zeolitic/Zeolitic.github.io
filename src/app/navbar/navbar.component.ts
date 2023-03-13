import { ViewportScroller } from '@angular/common';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss']
})
export class NavbarComponent {


  scrollToSection(anchor: string): void {
    const ele = document.getElementById(anchor);

    if(ele) ele.scrollIntoView({behavior: "smooth", block: "start", inline: "nearest"});

  }

}
