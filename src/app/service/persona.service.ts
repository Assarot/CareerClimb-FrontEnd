import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Persona } from '../model/persona';

@Injectable({
  providedIn: 'root',
})
export class PersonaService {
  private apiUrl = 'http://localhost:8080/api/personas';
  constructor(private http: HttpClient) {}

  getPersonas(): Observable<Persona[]> {
    return this.http.get<Persona[]>(this.apiUrl);
  }
  getPersonaById(idPersona: number): Observable<Persona> {
    return this.http.get<Persona>(`${this.apiUrl}/${idPersona}`);
  }
  crearPersona(persona: Persona): Observable<Persona> {
    return this.http.post<Persona>(this.apiUrl, persona);
  }
  editarPersona(persona: Persona): Observable<Persona> {
    return this.http.post<Persona>(this.apiUrl, persona);
  }
  eliminarPersona(idPersona: number) {
    return this.http.delete(`${this.apiUrl}/${idPersona}`);
  }
}
