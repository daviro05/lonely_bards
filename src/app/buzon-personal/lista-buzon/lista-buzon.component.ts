import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { BrinderModel } from 'src/app/shared/brinder.model';
import { BrinderService } from 'src/app/shared/services/brinder.service';
import { Utils } from 'src/app/shared/utils';
import { CodigoDialogComponent } from '../codigo-dialog/codigo-dialog.component';
import { MatDialog } from '@angular/material/dialog';

@Component({
  selector: 'app-lista-buzon',
  templateUrl: './lista-buzon.component.html',
  styleUrls: ['./lista-buzon.component.scss'],
})
export class ListaBuzonComponent implements OnInit {
  personajes: BrinderModel[] = [];
  mensajes: any[] = [];
  nombrePersonaje: string = '';
  codigo: string | null = null;
  utils: Utils;

  constructor(
    private brinderService: BrinderService,
    private router: Router,
    private dialog: MatDialog
  ) {
    this.utils = new Utils(this.router);
  }

  ngOnInit(): void {
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
          console.log('Códio encontrado');
          this.nombrePersonaje = personajeEncontrado.name.toUpperCase();
          // Si el usuario marcó "Recordar código", lo guardamos
          if (guardar) {
            localStorage.setItem('codigo_origen', codigo);
          }

          this.codigo = localStorage.getItem('codigo_origen'); // Recupera el código guardado

          if (this.codigo) {
            this.obtenerMensajes();
          } else {
            this.navegar('/inicio'); // Si no hay código, redirige a inicio
          }
        } else {
          alert('Código inválido.');
          this.router.navigate(['/inicio']);
        }
      },
      error: () => {
        this.router.navigate(['/inicio']);
      },
    });
  }

  obtenerMensajes(): void {
    if (this.codigo) {
      this.brinderService.listarMensajes(this.codigo).subscribe({
        next: (mensajes) => {
          this.mensajes = mensajes.map((mensaje) => ({
            ...mensaje,
            expandido: false,
          }));
        },
        error: (error) => console.error('Error al obtener mensajes:', error),
      });
    }
  }

  toggleMensaje(mensaje: any): void {
    mensaje.expandido = !mensaje.expandido;
  }

  cerrarBuzon(): void {
    localStorage.removeItem('codigo_origen'); // Elimina el código guardado
    this.router.navigate(['/inicio']); // Redirige a la página de inicio
  }

  navegar(ruta: string) {
    this.utils.navegar(ruta);
  }
}
