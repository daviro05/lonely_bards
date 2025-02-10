import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { BrinderComponent } from './brinder/brinder.component';
import { AltaPersonajeComponent } from './admin/alta-personaje/alta-personaje.component';
import { AuthGuard } from './auth.guard';
import { InicioComponent } from './inicio/inicio.component';
import { InfoComponent } from './info/info.component';
import { ListaPersonajesComponent } from './admin/lista-personajes/lista-personajes.component';
import { EditarPersonajeComponent } from './admin/editar-personaje/editar-personaje.component';

const routes: Routes = [
  { path: 'inicio', component: InicioComponent }, // Ruta específica para "Inicio"
  { path: 'brinder', component: BrinderComponent }, // Ruta específica para "Brinder"
  { path: 'info', component: InfoComponent }, // Ruta específica para "Info"
  { path: 'admin', component: ListaPersonajesComponent, canActivate: [AuthGuard] }, // Ruta de admin de usuarios protegida
  { path: 'alta', component: AltaPersonajeComponent, canActivate: [AuthGuard] }, // Ruta de alta de usuarios protegida
  { path: 'editar-personaje/:id', component: EditarPersonajeComponent, canActivate: [AuthGuard] }, // Ruta de edición de usuarios protegida
  { path: '**', redirectTo: 'inicio', pathMatch: 'full' }, // Redirección a la ruta específica
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
