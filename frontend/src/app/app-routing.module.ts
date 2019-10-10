import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { VerificaComponent } from './verifica/verifica.component';
import { HomeComponent } from './home/home.component';

const routes: Routes = [{
  path : '', component: HomeComponent
},{
  path : 'verifica/:id', component : VerificaComponent 
}];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
