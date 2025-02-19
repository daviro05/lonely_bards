import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import { Observable, of } from 'rxjs';
import { catchError, map } from 'rxjs/operators';
import { LonelyBardsService } from '../shared/services/lonely-bards.service';
import { MatDialog } from '@angular/material/dialog';
import { DialogSimpleComponent } from '../dialog/dialog-simple/dialog-simple.component';

@Injectable({
  providedIn: 'root',
})
export class BackendGuard implements CanActivate {
  constructor(
    private brinderService: LonelyBardsService,
    private router: Router,
    private dialog: MatDialog
  ) {}

  canActivate(): Observable<boolean> {
    return this.brinderService.statusBackend().pipe(
      map(() => true), // Si el backend responde, permite la navegación
      catchError(() => {
        this.mostrarDialogo(); // Si hay error, muestra el diálogo
        this.router.navigate(['/inicio']); // Redirige a la página de inicio
        return of(false);
      })
    );
  }

  private mostrarDialogo(): void {
    this.dialog.open(DialogSimpleComponent, {
      disableClose: true,
      data: {
        titulo: 'Servicio suspendido',
        mensaje:
          'Disculpen las molestias. Estamos trabajando para resolverlo lo antes posible.',
        cerrar: '',
      },
    });
  }
}
