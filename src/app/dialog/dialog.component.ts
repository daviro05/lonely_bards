import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'app-dialog',
  templateUrl: './dialog.component.html',
  styleUrls: ['./dialog.component.css'],  // Asegúrate de que está vinculado
})
export class DialogComponent {
  constructor(@Inject(MAT_DIALOG_DATA) public data: { title: string, message: string }) {}
}
