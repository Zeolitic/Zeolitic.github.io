import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { MainComponent } from './main/main.component';
import { ExampleComponent } from './example/example.component';
import { FireworkComponent } from './firework/firework.component';


const routes: Routes = [
  { path: 'examples', component: ExampleComponent},
  { path: 'examples/fireworks', component: FireworkComponent},
  { path: '**', component: MainComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
