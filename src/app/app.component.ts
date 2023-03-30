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

  private userAgent: string = navigator.userAgent || navigator.vendor;

  isMobileDevice = (): boolean => {
    const regexs = [/(Android)(.+)(Mobile)/i, /BlackBerry/i, /iPhone|iPod/i, /Opera Mini/i, /IEMobile/i]
    return regexs.some((b) => this.userAgent.match(b))
  }

  isTabletDevice = (): boolean => {
    const regex = /(ipad|tablet|(android(?!.*mobile))|(windows(?!.*phone)(.*touch))|kindle|playbook|silk|(puffin(?!.*(IP|AP|WP))))/
    return regex.test(this.userAgent.toLowerCase())
  }

  isDesktopDevice = (): boolean => !this.isMobileDevice() && !this.isTabletDevice()


  ngOnInit(){
    AOS.init({
      startEvent: 'load',
    });
  }
}
