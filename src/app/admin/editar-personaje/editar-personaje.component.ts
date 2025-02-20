import { Component } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { ActivatedRoute, Router } from '@angular/router';
import { DialogComponent } from 'src/app/dialog/dialog.component';
import { Clipboard } from '@angular/cdk/clipboard';
import { BrinderModel } from 'src/app/shared/brinder.model';
import { Utils } from 'src/app/shared/utils';
import { LonelyBardsService } from 'src/app/shared/services/lonely-bards.service';
import { MatCheckboxChange } from '@angular/material/checkbox';

@Component({
  selector: 'app-editar-personaje',
  templateUrl: './editar-personaje.component.html',
  styleUrls: ['./editar-personaje.component.scss'],
})
export class EditarPersonajeComponent {
  personaje!: BrinderModel;
  texto: string = '';
  utils: Utils;

  constructor(
    private route: ActivatedRoute,
    private brinderService: LonelyBardsService,
    private router: Router,
    private dialog: MatDialog,
    private clipboard: Clipboard
  ) {
    this.utils = new Utils(this.router);
  }

  ngOnInit(): void {
    const id = this.route.snapshot.paramMap.get('id');
    if (id) {
      this.brinderService.obtenerPersonaje(id).subscribe((data) => {
        this.personaje = data[0]; // Suponiendo que el backend devuelve un array con un solo objeto
      });
    }
  }

  toggleActivo(event: MatCheckboxChange): void {
    const checked = event.checked;
    this.personaje.activo = checked ? 'activo' : 'inactivo';
  }

  guardarCambios(): void {
    if (this.personaje.id) {
      this.brinderService
        .updatePersonaje(this.personaje.id, this.personaje)
        .subscribe(
          () => {
            const dialogRef = this.openDialog(
              'Edición correcta',
              'Personaje editado con éxito'
            );
            dialogRef.afterClosed().subscribe(() => {
              this.navegar('admin');
            });
          },
          (error) => {
            console.error('Error al editar al personaje:', error);
            this.openDialog(
              'Error',
              'Hubo un error al editar al personaje. Contacta con el Zorro Negro.'
            );
          }
        );
    }
  }

  openDialog(title: string, message: string) {
    return this.dialog.open(DialogComponent, {
      data: {
        title: title,
        message: message,
      },
    });
  }

  copiarAlPortapapeles(): void {
    this.clipboard.copy(this.personaje.codigo);
    //alert('Código copiado al portapapeles');
  }

  navegar(ruta: string) {
    this.utils.navegar(ruta);
  }
}
