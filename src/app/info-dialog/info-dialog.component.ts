import { Component } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-info-dialog',
  templateUrl: './info-dialog.component.html',
  styleUrls: ['./info-dialog.component.scss']
})
export class InfoDialogComponent {
  noMostrarMas = false;

  constructor(private dialogRef: MatDialogRef<InfoDialogComponent>) {}

  cerrar() {
    if (this.noMostrarMas) {
      localStorage.setItem('brinder_noMostrarInfo', 'true');
    }
    this.dialogRef.close();
  }
}
