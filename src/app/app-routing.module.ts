import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { BrinderComponent } from './brinder/brinder.component';
import { AltaPersonajeComponent } from './admin/alta-personaje/alta-personaje.component';
import { AuthGuard } from './auth.guard';
import { InicioComponent } from './inicio/inicio.component';
import { InfoComponent } from './info/info.component';
import { ListaPersonajesComponent } from './admin/lista-personajes/lista-personajes.component';
import { EditarPersonajeComponent } from './admin/editar-personaje/editar-personaje.component';
import { ContactoComponent } from './contacto/contacto.component';
import { BuzonPersonalComponent } from './buzon-personal/buzon-personal.component';

const routes: Routes = [
  { path: 'inicio', component: InicioComponent }, // Ruta específica para "Inicio"
  { path: 'brinder', component: BrinderComponent }, // Ruta específica para "Brinder"
  { path: 'info', component: InfoComponent }, // Ruta específica para "Info"
  { path: 'buzon', component: BuzonPersonalComponent }, // Ruta específica para "Buzón Personal"
  { path: 'contacto', component: ContactoComponent }, // Ruta específica para "Contacto"  
  { 
    path: 'admin', 
    canActivate: [AuthGuard], 
    children: [
      { path: '', component: ListaPersonajesComponent }, // Lista de personajes
      { path: 'alta', component: AltaPersonajeComponent }, // Alta de personajes
      { path: 'editar-personaje/:id', component: EditarPersonajeComponent } // Edición de personajes
    ] 
  },
  { path: '**', redirectTo: 'inicio', pathMatch: 'full' }, // Redirección a la ruta específica
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
