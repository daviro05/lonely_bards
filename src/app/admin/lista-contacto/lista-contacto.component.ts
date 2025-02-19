import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { LonelyBardsService } from 'src/app/shared/services/lonely-bards.service';
import { Utils } from 'src/app/shared/utils';

@Component({
  selector: 'app-lista-contacto',
  templateUrl: './lista-contacto.component.html',
  styleUrls: ['./lista-contacto.component.scss'],
})
export class ListaContactoComponent implements OnInit {
  mensajes: any[] = [];
  tipo: string = 'lonely';
  utils: Utils;

  constructor(
    protected lonelyBardsService: LonelyBardsService,
    protected router: Router,
    protected dialog: MatDialog
  ) {
    this.utils = new Utils(this.router);
  }

  ngOnInit(): void {
    this.cargarMensajesContacto();
  }

  cargarMensajesContacto(): void {
    this.lonelyBardsService.listarMensajesContacto(this.tipo).subscribe((data) => {
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
