import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-codigo-dialog',
  templateUrl: './codigo-dialog.component.html',
  styleUrls: ['./codigo-dialog.component.scss']
})
export class CodigoDialogComponent {
  valor: string = '';
  guardarValor: boolean = false;
  recordar: boolean;
  mostrarPassword: boolean = false;
  esCodigo: boolean; // Para saber si es código o alias

  constructor(
    private dialogRef: MatDialogRef<CodigoDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: { recordar: boolean; tipo: 'codigo' | 'alias'; valorActual?: string }
  ) {
    this.recordar = data.recordar;
    this.esCodigo = data.tipo === 'codigo';
    this.valor = data.valorActual || '';
  }

  confirmar() {
    this.dialogRef.close({ valor: this.valor, guardar: this.guardarValor });
  }

  cancelar() {
    this.dialogRef.close(null);
  }
}
