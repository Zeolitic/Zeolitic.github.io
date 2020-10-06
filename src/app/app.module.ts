import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { MainComponent } from './main/main.component';
import { ChatbotComponent } from './chatbot/chatbot.component';
import { HttpClientModule } from '@angular/common/http';
import { ExampleComponent } from './example/example.component';
import { FireworkComponent } from './firework/firework.component';
import { MatrixComponent } from './matrix/matrix.component';
import { FlowfieldComponent } from './flowfield/flowfield.component';
import { MarchingsquaresComponent } from './marchingsquares/marchingsquares.component';
import { RaindropComponent } from './raindrop/raindrop.component';
import { ReflectComponent } from './reflect/reflect.component';
import { ImpressionismComponent } from './impressionism/impressionism.component';

@NgModule({
  declarations: [
    AppComponent,
    MainComponent,
    ChatbotComponent,
    ExampleComponent,
    FireworkComponent,
    MatrixComponent,
    FlowfieldComponent,
    MarchingsquaresComponent,
    RaindropComponent,
    ReflectComponent,
    ImpressionismComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
