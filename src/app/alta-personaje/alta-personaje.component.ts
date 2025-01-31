import { Component } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BrinderService } from '../shared/services/brinder.service';
import { MatDialog } from '@angular/material/dialog';
import { DialogComponent } from '../dialog/dialog.component';
import { Utils } from '../shared/utils';
import { Router } from '@angular/router';

@Component({
  selector: 'app-alta-personaje',
  templateUrl: './alta-personaje.component.html',
  styleUrls: ['./alta-personaje.component.css'],
})
export class AltaPersonajeComponent {
  utils: Utils;
  nombre: string = '';
  imagen: File | null = null;

  constructor(
    private http: HttpClient,
    private dialog: MatDialog,
    private brinderService: BrinderService,
    private router: Router
  ) {
    this.utils = new Utils(this.router);
  }

  onFileSelected(event: any) {
    const file = event.target.files[0];
    if (file) {
      this.imagen = file;
    }
  }

  onSubmit() {
    if (!this.nombre) {
      return;
    }

    // Crear el FormData
    const formData = new FormData();
    formData.append('name', this.nombre);
    formData.append('image_url', this.imagen ?? '');

    this.brinderService.agregarPersonaje(formData).subscribe(
      (response) => {
        this.openDialog('Alta correcta', 'Personaje registrado con éxito');
        this.nombre = '';
        this.imagen = null;
      },
      (error) => {
        console.error('Error al registrar al personaje:', error);
        this.openDialog(
          'Error',
          'Hubo un error al registrar al personaje. <br>Contacta con el Centurión.'
        );
      }
    );
  }

  openDialog(title: string, message: string): void {
    this.dialog.open(DialogComponent, {
      data: {
        title: title,
        message: message,
      },
    });
  }

  navegar(ruta: string) {
    this.utils.navegar(ruta);
  }
}
