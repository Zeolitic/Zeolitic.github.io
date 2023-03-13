import { Component, ElementRef, Input, OnInit, ViewChild } from '@angular/core';
import { ThemeService } from './theme.service';
import * as AOS from 'aos';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styles: [`

    @media screen and (max-width: 650px) {
      #about {
        height: fit-content !important;
      }
    }
  `]
})
export class AppComponent implements OnInit{
  constructor(readonly theme: ThemeService) {}

  ngOnInit(){
    AOS.init({
      startEvent: 'load',
    });
  }
}
