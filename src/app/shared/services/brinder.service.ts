import { BrinderModel } from './../brinder.model';
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../../environments/environment';
import { MatchModel } from '../match.model';

@Injectable({
  providedIn: 'root'
})
export class BrinderService {

  BASE_URL = environment.BASE_URL;

  constructor(private http: HttpClient) { }

  obtenerPersonajes() {
    return this.http.get<BrinderModel[]>(this.BASE_URL+'/personajes');
  }

  obtenerPersonaje(id: string) {
    return this.http.get<BrinderModel[]>(`${this.BASE_URL}/personajes/${id}`);
  }

  sendMatch(matchData: MatchModel) {
    return this.http.post(`${this.BASE_URL}/matches`, matchData);
  }

  agregarPersonaje(personaje: FormData) {
    return this.http.post<string>(`${this.BASE_URL}/personajes/agregar`, personaje);
  }

  updatePersonaje(id: string, personaje: Partial<BrinderModel>) {
    return this.http.put(`${this.BASE_URL}/personajes/editar/${id}`, personaje);
  }

  borrarPersonaje(id: string) {
    return this.http.delete<string>(`${this.BASE_URL}/personajes/borrar/${id}`)
  }

  enviarContacto(contacto: { nombre: string; mensaje: string }) {
    return this.http.post<string>(`${this.BASE_URL}/contacto`, contacto);
  }
}
