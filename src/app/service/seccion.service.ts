import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Seccion } from '../model/seccion';

@Injectable({
  providedIn: 'root',
})
export class SeccionService {
  private apiUrl = 'http://localhost:8080/api/secciones';
  constructor(private http: HttpClient) {}

  getSecciones(): Observable<Seccion[]> {
    return this.http.get<Seccion[]>(this.apiUrl);
  }
  getSeccionId(idSeccion: number): Observable<Seccion> {
    return this.http.get<Seccion>(`${this.apiUrl}/${idSeccion}`);
  }
  crearSeccion(seccion: Seccion): Observable<Seccion> {
    return this.http.post<Seccion>(this.apiUrl, seccion);
  }
  editarSeccion(seccion: Seccion): Observable<Seccion> {
    return this.http.post<Seccion>(this.apiUrl, seccion);
  }
  eliminarSeccion(idSeccion: number) {
    return this.http.delete(`${this.apiUrl}/${idSeccion}`);
  }
}
