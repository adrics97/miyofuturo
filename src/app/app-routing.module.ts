import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { rutas } from './rutas';

const routes: Routes = [];

@NgModule({
  imports: [RouterModule.forRoot(rutas)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
