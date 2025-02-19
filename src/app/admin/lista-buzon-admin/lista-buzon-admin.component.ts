import { Component } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { LonelyBardsService } from 'src/app/shared/services/lonely-bards.service';
import { Utils } from 'src/app/shared/utils';

@Component({
  selector: 'app-lista-buzon-admin',
  templateUrl: './lista-buzon-admin.component.html',
  styleUrls: ['./lista-buzon-admin.component.scss'],
})
export class ListaBuzonAdminComponent {
  mensajes: any[] = [];
  utils: Utils;

  constructor(
    protected lonelyBardsService: LonelyBardsService,
    protected router: Router,
    protected dialog: MatDialog
  ) {
    this.utils = new Utils(this.router);
  }

  ngOnInit(): void {
    this.cargarMensajesBuzon();
  }

  cargarMensajesBuzon(): void {
    this.lonelyBardsService.listarMensajesBuzon().subscribe((data) => {
      console.log(data)
      this.mensajes = data.map((msg) => ({ ...msg, expandido: false }));
    });
  }

  toggleMensaje(mensaje: any): void {
    mensaje.expandido = !mensaje.expandido;
  }

  navegar(ruta: string) {
    this.utils.navegar(ruta);
  }
}
