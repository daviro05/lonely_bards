import { Component, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { DomSanitizer, SafeHtml } from '@angular/platform-browser';

interface InfoDialogData {
  titulo: string;
  contenido: string;
  claveLocalStorage?: string;
}

@Component({
  selector: 'app-info-dialog',
  templateUrl: './info-dialog.component.html',
  styleUrls: ['./info-dialog.component.scss'],
})
export class InfoDialogComponent {
  noMostrarMas = false;
  contenidoSeguro: SafeHtml;
  

  constructor(
    private dialogRef: MatDialogRef<InfoDialogComponent>,
    private sanitizer: DomSanitizer,
    @Inject(MAT_DIALOG_DATA) public data: InfoDialogData
  ) {
    this.contenidoSeguro = this.sanitizer.bypassSecurityTrustHtml(
      data.contenido
    );
  }

  cerrar() {
    if (this.noMostrarMas && this.data.claveLocalStorage) {
      localStorage.setItem(this.data.claveLocalStorage, 'true');
    }
    this.dialogRef.close();
  }
}
