import { Component } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { BuzonService } from '../../shared/services/buzon.service';
import { BuzonBaseComponent } from '../buzon-base/buzon-base.component';
import { Utils } from 'src/app/shared/utils';

@Component({
  selector: 'app-lista-buzon',
  templateUrl: './lista-buzon.component.html',
  styleUrls: ['./lista-buzon.component.scss'],
})
export class ListaBuzonComponent extends BuzonBaseComponent {
  mensajes: any[] = [];
  utils: Utils;

  constructor(
    protected override buzonService: BuzonService,
    protected override router: Router,
    protected override dialog: MatDialog
  ) {
    super(buzonService, router, dialog);
    this.utils = new Utils(this.router);
  }

  onCodigoValidado(): void {
    this.buzonService.obtenerMensajes(this.codigo!).subscribe((mensajes) => {
      this.mensajes = mensajes.map((msg) => ({ ...msg, expandido: false }));
    });
  }

  toggleMensaje(mensaje: any): void {
    mensaje.expandido = !mensaje.expandido;
  }

  navegar(ruta: string) {
    this.utils.navegar(ruta);
  }
}
