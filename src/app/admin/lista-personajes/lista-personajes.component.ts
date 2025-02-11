import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { DialogComponent } from 'src/app/dialog/dialog.component';
import { BrinderModel } from 'src/app/shared/brinder.model';
import { BrinderService } from 'src/app/shared/services/brinder.service';
import { Utils } from 'src/app/shared/utils';

@Component({
  selector: 'app-lista-personajes',
  templateUrl: './lista-personajes.component.html',
  styleUrls: ['./lista-personajes.component.scss'],
})
export class ListaPersonajesComponent implements OnInit {
  personajes: BrinderModel[] = [];
  utils: Utils;

  constructor(
    private brinderService: BrinderService,
    private router: Router,
    private dialog: MatDialog
  ) {
    this.utils = new Utils(this.router);
  }

  ngOnInit(): void {
    this.cargarPersonajes();
  }

  cargarPersonajes(): void {
    this.brinderService.obtenerPersonajes().subscribe((data) => {
      this.personajes = data.sort((a, b) => a.name.localeCompare(b.name)); // Orden alfabético
      this.personajes = this.personajes.filter((personaje) => personaje.tipo === 'brinder');
    });
  }

  eliminarPersonaje(id: string): void {
    if (confirm('¿Seguro que quieres eliminar este personaje?')) {
      this.brinderService.borrarPersonaje(id).subscribe(
        () => {
          this.personajes = this.personajes.filter((p) => p.id !== id);
        },
        (error) => {
          console.error('Error al editar al personaje:', error);
          this.openDialog(
            'Error',
            'Hubo un error al editar al personaje. Contacta con el Centurión.'
          );
        }
      );
    }
  }

  editarPersonaje(id: string): void {
    this.utils.navegar(`/editar-personaje/${id}`);
  }

  openDialog(title: string, message: string) {
    return this.dialog.open(DialogComponent, {
      data: {
        title: title,
        message: message,
      },
    });
  }

  getBordeClase(character: any): string {
    switch (character.info_user) {
      case 'romantico': return 'borde-rojo';
      case 'amistad': return 'borde-azul';
      case 'surja': return 'borde-verde';
      case 'tipo4': return 'borde-amarillo';
      default: return 'borde-generico';
    }
  }

  navegar(ruta: string) {
    this.utils.navegar(ruta);
  }
}
