import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { MainComponent } from './main/main.component';
import { ExampleComponent } from './example/example.component';
import { FireworkComponent } from './firework/firework.component';
import { MatrixComponent } from './matrix/matrix.component';
import { FlowfieldComponent } from './flowfield/flowfield.component';
import { MarchingsquaresComponent } from './marchingsquares/marchingsquares.component';
import { RaindropComponent } from './raindrop/raindrop.component';
import { ReflectComponent } from './reflect/reflect.component';
import { ImpressionismComponent } from './impressionism/impressionism.component';


const routes: Routes = [
  { path: 'examples', component: ExampleComponent},
  { path: 'examples/fireworks', component: FireworkComponent},
  { path: 'examples/matrix', component: MatrixComponent},
  { path: 'examples/flowfield', component: FlowfieldComponent},
  { path: 'examples/marchingsquares', component: MarchingsquaresComponent},
  { path: 'examples/raindrops', component: RaindropComponent},
  { path: 'examples/reflect', component: ReflectComponent},
  { path: 'examples/impressionism', component: ImpressionismComponent},
  { path: '**', component: MainComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
