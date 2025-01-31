import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { BrinderComponent } from './brinder/brinder.component';
import { AltaPersonajeComponent } from './alta-personaje/alta-personaje.component';
import { AuthGuard } from './auth.guard';


const routes: Routes = [
  { path: '', component: BrinderComponent }, // Ruta específica para "Inicio"
  { path: 'alta', component: AltaPersonajeComponent, canActivate: [AuthGuard] },  // Ruta protegida
  { path: '**', redirectTo: '', pathMatch: 'full' }, // Redirección a la ruta específica
];


@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
