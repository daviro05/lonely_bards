import { Injectable } from '@angular/core';
import { BrinderService } from './brinder.service';
import { BrinderModel } from '../brinder.model';
import { Observable, of } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class BuzonService {
  private personajes: BrinderModel[] = [];
  private codigo!: string;
  private nombrePersonaje!: string;

  constructor(private brinderService: BrinderService) {}

  obtenerPersonajes(): Observable<BrinderModel[]> {
    if (this.personajes.length > 0) {
      return of(this.personajes); // Devuelve los personajes en caché si ya fueron cargados
    }
    return new Observable(observer => {
      this.brinderService.obtenerPersonajes().subscribe(
        (data) => {
          this.personajes = data;
          observer.next(this.personajes);
          observer.complete();
        },
        (error) => observer.error(error)
      );
    });
  }

  solicitarCodigo(): string | null {
    return localStorage.getItem('codigo_origen');
  }

  validarCodigo(codigo: string, guardar?: boolean): Observable<{ codigo: string, nombre: string }> {
    return new Observable(observer => {
      this.obtenerPersonajes().subscribe({
        next: (data) => {
          const personajeEncontrado = data.find(p => p.codigo === codigo);
          if (personajeEncontrado) {
            this.codigo = codigo;
            this.nombrePersonaje = personajeEncontrado.name.toUpperCase();
            if (guardar) {
              localStorage.setItem('codigo_origen', codigo);
            }
            observer.next({ codigo: this.codigo, nombre: this.nombrePersonaje });
            observer.complete();
          } else {
            observer.error('Código inválido.');
          }
        },
        error: (err) => observer.error(err)
      });
    });
  }

  obtenerMensajes(codigo: string): Observable<any[]> {
    return this.brinderService.listarMensajes(codigo);
  }

  enviarMensaje(buzon: { codigo_origen: string; codigo_destino: string; mensaje: string }): Observable<any> {
    return this.brinderService.enviarMensaje(buzon);
  }

  cerrarBuzon(): void {
    localStorage.removeItem('codigo_origen');
  }
}
