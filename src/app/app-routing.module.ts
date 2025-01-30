import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { BrinderComponent } from './brinder/brinder.component';


const routes: Routes = [
  { path: 'inicio', component: BrinderComponent }, // Ruta específica para "Inicio"
  { path: '**', redirectTo: '/inicio', pathMatch: 'full' }, // Redirección a la ruta específica
];


@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
