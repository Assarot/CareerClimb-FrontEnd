import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { PersonaDetalleCargo } from '../model/persona-detalle-cargo';

@Injectable({
  providedIn: 'root',
})
export class PersonaDetalleCargoService {
  private apiUrl = 'http://localhost:8080/api/persona-detalle-cargo';
  constructor(private http: HttpClient) {}

  getPersonaDetalleCargos(): Observable<PersonaDetalleCargo[]> {
    return this.http.get<PersonaDetalleCargo[]>(this.apiUrl);
  }
  getpersonaDetalleCargoById(
    idPersonaDetalleCargo: number
  ): Observable<PersonaDetalleCargo> {
    return this.http.get<PersonaDetalleCargo>(
      `${this.apiUrl}/${idPersonaDetalleCargo}`
    );
  }
  crearpersonaDetalleCargo(
    personaDetalleCargo: PersonaDetalleCargo
  ): Observable<PersonaDetalleCargo> {
    return this.http.post<PersonaDetalleCargo>(
      this.apiUrl,
      personaDetalleCargo
    );
  }
  editarpersonaDetalleCargo(
    personaDetalleCargo: PersonaDetalleCargo
  ): Observable<PersonaDetalleCargo> {
    return this.http.post<PersonaDetalleCargo>(
      this.apiUrl,
      personaDetalleCargo
    );
  }
  eliminarpersonaDetalleCargo(idPersonaDetalleCargo: number) {
    return this.http.delete(`${this.apiUrl}/${idPersonaDetalleCargo}`);
  }
}
