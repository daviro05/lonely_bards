import { Component } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-codigo-dialog',
  templateUrl: './codigo-dialog.component.html',
  styleUrls: ['./codigo-dialog.component.scss']
})
export class CodigoDialogComponent {
  codigo: string = '';
  guardarCodigo: boolean = false;

  constructor(private dialogRef: MatDialogRef<CodigoDialogComponent>) {}

  confirmar() {
    this.dialogRef.close({ codigo: this.codigo, guardar: this.guardarCodigo });
  }

  cancelar() {
    this.dialogRef.close(null);
  }
}
