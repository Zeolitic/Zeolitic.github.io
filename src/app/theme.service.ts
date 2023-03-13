import { OverlayContainer } from '@angular/cdk/overlay';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ThemeService {

  isDark = false;

  constructor(private readonly _overlay: OverlayContainer) {
    const isDarkMode = localStorage.getItem("isDarkMode");

    this.isDark = isDarkMode !== "undefined" && isDarkMode ? JSON.parse(isDarkMode) as boolean : false;

    this.setOverlayContainerTheme();
  }

  toggleTheme = (): void => {
    this.isDark = !this.isDark;
    this.setOverlayContainerTheme();
  }

  setOverlayContainerTheme = (): void => {
    if (this.isDark) {
      this._overlay.getContainerElement().classList.remove('light-theme');
      this._overlay.getContainerElement().classList.add('dark-theme');
    } else {
      this._overlay.getContainerElement().classList.remove('dark-theme');
      this._overlay.getContainerElement().classList.add('light-theme');
    }
  }
}
