import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { DialogComponent } from '../dialog/dialog.component';
import { BrinderService } from '../shared/services/brinder.service';
import { Utils } from '../shared/utils';
import { BrinderModel } from '../shared/brinder.model';
import { CodigoDialogComponent } from './codigo-dialog/codigo-dialog.component';

@Component({
  selector: 'app-buzon-personal',
  templateUrl: './buzon-personal.component.html',
  styleUrls: ['./buzon-personal.component.scss'],
})
export class BuzonPersonalComponent implements OnInit {
  personajes: BrinderModel[] = [];
  personajeBuzon!: BrinderModel;
  nombrePersonaje: string = '';
  buzon = { codigo_origen: '', codigo_destino: '', mensaje: '' };
  utils: Utils;

  constructor(
    private brinderService: BrinderService,
    private router: Router,
    private dialog: MatDialog
  ) {
    this.utils = new Utils(this.router);
  }

  ngOnInit(): void {
    this.obtenerPersonajes();
    this.solicitarCodigo();
  }

  solicitarCodigo(): void {
    // Revisar si hay un código guardado
    const codigoGuardado = localStorage.getItem('codigo_origen');

    if (codigoGuardado) {
      this.validarCodigo(codigoGuardado);
      return;
    }

    const dialogRef = this.dialog.open(CodigoDialogComponent, {
      disableClose: true,
    });

    dialogRef.afterClosed().subscribe((result) => {
      if (result && result.codigo) {
        this.validarCodigo(result.codigo, result.guardar);
      } else {
        this.router.navigate(['/inicio']); // Si cancela, lo redirige
      }
    });
  }

  validarCodigo(codigo: string, guardar?: boolean): void {
    this.brinderService.obtenerPersonajes().subscribe({
      next: (data) => {
        this.personajes = data;

        // Buscar el personaje con el código ingresado
        const personajeEncontrado = this.personajes.find(
          (p) => p.codigo === codigo
        );

        if (personajeEncontrado) {
          this.personajeBuzon = personajeEncontrado;
          this.nombrePersonaje = this.personajeBuzon.name.toUpperCase();
          this.buzon.codigo_origen = this.personajeBuzon.codigo;

          // Si el usuario marcó "Recordar código", lo guardamos
          if (guardar) {
            localStorage.setItem('codigo_origen', codigo);
          }
        } else {
          alert('Código inválido. Inténtalo de nuevo.');
          this.solicitarCodigo(); // Volver a pedir el código
        }
      },
      error: () => {
        this.router.navigate(['/inicio']);
      },
    });
  }

  obtenerPersonajes() {
    this.brinderService.obtenerPersonajes().subscribe(
      (data) => {
        this.personajes = data;
      },
      (error) => {
        console.error('Error al obtener personajes:', error);
      }
    );
  }

  enviarMensaje(): void {
    if (
      this.buzon.codigo_destino &&
      this.buzon.mensaje &&
      this.buzon.codigo_origen
    ) {
      this.brinderService.enviarMensaje(this.buzon).subscribe(() => {
        const dialogRef = this.openDialog(
          '¡Mensaje enviado con éxito!',
          'Gracias por utilizar el buzón anónimo de Judea'
        );
        this.buzon = {
          codigo_origen: this.personajeBuzon.codigo,
          codigo_destino: '',
          mensaje: '',
        };
      });
    } else {
      console.log('Error, buzón incompleto');
    }
  }

  cerrarBuzon(): void {
    localStorage.removeItem('codigo_origen'); // Elimina el código guardado
    this.router.navigate(['/inicio']); // Redirige a la página de inicio
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
    this.utils.navegar(ruta);
  }
}
