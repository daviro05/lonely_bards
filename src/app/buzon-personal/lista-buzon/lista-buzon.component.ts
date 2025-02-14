import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { BrinderService } from 'src/app/shared/services/brinder.service';
import { Utils } from 'src/app/shared/utils';

@Component({
  selector: 'app-lista-buzon',
  templateUrl: './lista-buzon.component.html',
  styleUrls: ['./lista-buzon.component.scss'],
})
export class ListaBuzonComponent implements OnInit {
  mensajes: any[] = [];
  codigoDestino: string | null = null;
  utils: Utils;

  constructor(private brinderService: BrinderService, private router: Router) {
    this.utils = new Utils(this.router);
  }

  ngOnInit(): void {
    this.obtenerCodigoDestino();
  }

  obtenerCodigoDestino(): void {
    this.codigoDestino = localStorage.getItem('codigo_origen'); // Recupera el código guardado

    if (this.codigoDestino) {
      this.obtenerMensajes();
    } else {
      this.navegar('/inicio'); // Si no hay código, redirige a inicio
    }
  }

  obtenerMensajes(): void {
    if (this.codigoDestino) {
      this.brinderService.listarMensajes(this.codigoDestino).subscribe({
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

  navegar(ruta: string) {
    this.utils.navegar(ruta);
  }
}
