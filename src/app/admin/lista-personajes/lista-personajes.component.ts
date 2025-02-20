import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { CodigoDialogComponent } from 'src/app/dialog/codigo-dialog/codigo-dialog.component';
import { DialogComponent } from 'src/app/dialog/dialog.component';
import { BrinderModel } from 'src/app/shared/brinder.model';
import { MatchModel } from 'src/app/shared/match.model';
import { LonelyBardsService } from 'src/app/shared/services/lonely-bards.service';
import { Utils } from 'src/app/shared/utils';

@Component({
  selector: 'app-lista-personajes',
  templateUrl: './lista-personajes.component.html',
  styleUrls: ['./lista-personajes.component.scss'],
})
export class ListaPersonajesComponent implements OnInit {
  personajes: BrinderModel[] = [];
  matches: MatchModel[] = [];
  utils: Utils;
  tipo: string = 'lonely';

  constructor(
    private lonelyBardsService: LonelyBardsService,
    private router: Router,
    private dialog: MatDialog
  ) {
    this.utils = new Utils(this.router);
  }

  ngOnInit(): void {
    this.cargarPersonajes();
    this.cargarMatches();
  }

  cargarPersonajes(): void {
    this.lonelyBardsService.obtenerPersonajes(this.tipo).subscribe((data) => {
      this.personajes = data.sort((a, b) => a.name.localeCompare(b.name)); // Orden alfabético
    });
  }

  cargarMatches(): void {
    this.lonelyBardsService.obtenerMatches(this.tipo).subscribe((data) => {
      this.matches = data.sort((a, b) =>
        a.personaje1_name.localeCompare(b.personaje1_name)
      ); // Orden alfabético
    });
  }

  eliminarPersonaje(id: string): void {
    if (confirm('¿Seguro que quieres eliminar este personaje?')) {
      this.lonelyBardsService.borrarPersonaje(id).subscribe(
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
    this.utils.navegar(`admin/editar-personaje/${id}`);
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
      case 'romantico':
        return 'borde-rojo';
      case 'amistad':
        return 'borde-azul';
      case 'surja':
        return 'borde-verde';
      case 'tipo4':
        return 'borde-amarillo';
      default:
        return 'borde-generico';
    }
  }

  navegar(ruta: string) {
    if (ruta === 'admin/buzon') {
      const dialogRef = this.dialog.open(CodigoDialogComponent, {
        disableClose: true,
        data: { recordar: false, tipo: 'codigo' },
      });

      dialogRef.afterClosed().subscribe((result) => {
        if (result && result.valor === 'abrakadabra') {
          this.router.navigate(['/admin/buzon']);
        } else {
          this.router.navigate(['/admin']);
        }
      });
    } else {
      this.utils.navegar(ruta);
    }
  }
}
