import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-codigo-dialog',
  templateUrl: './codigo-dialog.component.html',
  styleUrls: ['./codigo-dialog.component.scss']
})
export class CodigoDialogComponent {
  codigo: string = '';
  guardarCodigo: boolean = false;
  recordar: boolean;
  mostrarPassword: boolean = false;

  constructor(private dialogRef: MatDialogRef<CodigoDialogComponent>,  @Inject(MAT_DIALOG_DATA) public data: { recordar: boolean }) {
    this.recordar = data.recordar;
  }

  confirmar() {
    this.dialogRef.close({ codigo: this.codigo, guardar: this.guardarCodigo });
  }

  cancelar() {
    this.dialogRef.close(null);
  }
}
