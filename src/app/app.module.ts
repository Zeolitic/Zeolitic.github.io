import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MaterialModule } from './material.module';
import { NavbarComponent } from './navbar/navbar.component';
import { HeroComponent } from './hero/hero.component';
import { PlanetComponent } from './planet/planet.component';
import { ContactComponent } from './contact/contact.component';
import { StarsComponent } from './stars/stars.component';
import { IntroductionComponent } from './introduction/introduction.component';
import { TechCardComponent } from './tech-card/tech-card.component';
import { TechSphereComponent } from './tech-sphere/tech-sphere.component';
import { ProjectsComponent } from './projects/projects.component';
import { TechSphereContainerComponent } from './tech-sphere-container/tech-sphere-container.component';
import { WorkComponent } from './work/work.component';

@NgModule({
  declarations: [
    AppComponent,
    NavbarComponent,
    HeroComponent,
    PlanetComponent,
    ContactComponent,
    StarsComponent,
    IntroductionComponent,
    TechCardComponent,
    TechSphereComponent,
    ProjectsComponent,
    TechSphereContainerComponent,
    WorkComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    MaterialModule,
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
