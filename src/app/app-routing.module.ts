import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { GraphsComponent } from './Components/dashboard/graphs/graphs.component';
import { MapaComponent } from './Components/dashboard/mapa/mapa.component';
import { InicioComponent } from './Components/inicio/inicio.component';
import { LoginComponent } from './Components/login/login.component';
import { PlansComponent } from './Components/plans/plans.component';

const routes: Routes = [
  {path:"",component:InicioComponent},
  {path:"login",component:LoginComponent},
  {path:"plans",component:PlansComponent},
  {path:"dashboard",component:GraphsComponent},
  {path:"mapa",component:MapaComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
