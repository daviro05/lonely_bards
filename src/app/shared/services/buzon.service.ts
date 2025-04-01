import { Injectable } from '@angular/core';
import { BrinderService } from './brinder.service';
import { BrinderModel } from '../brinder.model';
import { Observable, of, tap } from 'rxjs';
@Injectable({
  providedIn: 'root',
})
export class BuzonService {
  private personajes: BrinderModel[] = [];
  private codigo!: string;
  private nombrePersonaje!: string;
  private aliasPersonaje!: string;
  private imagenPersonaje!: string;
  private rolPersonaje!: string;
  tipo: string = 'lonely';

  constructor(private brinderService: BrinderService) {}

  obtenerPersonajes(forceRefresh: boolean = false): Observable<BrinderModel[]> {
    // Si forceRefresh es true, ignoramos la caché y volvemos a llamar al servidor
    if (forceRefresh || this.personajes.length === 0) {
      return new Observable((observer) => {
        this.brinderService.obtenerPersonajes(this.tipo).subscribe(
          (data) => {
            this.personajes = data; // Actualizamos la caché
            observer.next(this.personajes);
            observer.complete();
          },
          (error) => observer.error(error)
        );
      });
    } else {
      return of(this.personajes); // Devuelve los personajes de la caché si no se solicita actualización
    }
  }

  actualizarAlias(codigo: string, nuevoAlias: string): Observable<any> {
    // Realizamos la actualización del alias en el servidor
    return this.brinderService.actualizarAlias(codigo, nuevoAlias).pipe(
      tap(() => {
        // Cuando se actualiza el alias, forzamos la recarga de los personajes
        this.personajes = []; // Vaciar caché
      })
    );
  }

  solicitarCodigo(): string | null {
    return localStorage.getItem('codigo_lonely');
  }

  validarCodigo(
    codigo: string,
    guardar?: boolean
  ): Observable<{ codigo: string; nombre: string; alias: string, imagen: string, rol: string }> {
    return new Observable((observer) => {
      // Realizamos una nueva llamada para obtener los personajes más actualizados
      this.obtenerPersonajes(true).subscribe({
        next: (data) => {
          let personajeEncontrado = data.find((p) => p.codigo === codigo);

          if (!personajeEncontrado) {
            personajeEncontrado = data.find((p) => p.alias === codigo);
          }

          if (personajeEncontrado) {
            this.codigo = personajeEncontrado.codigo;
            this.nombrePersonaje = personajeEncontrado.name.toUpperCase();
            this.aliasPersonaje = personajeEncontrado.alias;
            this.imagenPersonaje = personajeEncontrado.image_url;
            this.rolPersonaje = personajeEncontrado.rol;

            if (guardar) {
              localStorage.setItem('codigo_lonely', this.codigo);
            }

            observer.next({
              codigo: this.codigo,
              nombre: this.nombrePersonaje,
              alias: this.aliasPersonaje,
              imagen: this.imagenPersonaje,
              rol: this.rolPersonaje
            });
            observer.complete();
          } else {
            observer.error('Código o alias inválido.');
          }
        },
        error: (err) => observer.error(err),
      });
    });
  }

  obtenerMensajesRecibidos(codigo: string): Observable<any[]> {
    return this.brinderService.listarMensajesRecibidos(codigo);
  }

  obtenerMensajesEnviados(codigo: string): Observable<any[]> {
    return this.brinderService.listarMensajesEnviados(codigo);
  }


  enviarMensaje(buzon: {
    codigo_origen: string;
    codigo_destino: string;
    mensaje: string;
    tipo: string;
  }): Observable<any> {
    return this.brinderService.enviarMensaje(buzon);
  }

  cerrarBuzon(): void {
    localStorage.removeItem('codigo_lonely');
  }
}
