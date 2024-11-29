import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Requerimiento } from '../model/requerimiento';

@Injectable({
  providedIn: 'root',
})
export class RequerimientoService {
  private apiUrl = 'http://localhost:8080/api/requerimientos';
  constructor(private http: HttpClient) {}

  getRequerimientos(): Observable<Requerimiento[]> {
    return this.http.get<Requerimiento[]>(this.apiUrl);
  }
  getRequerimientoId(idRequerimiento: number): Observable<Requerimiento> {
    return this.http.get<Requerimiento>(`${this.apiUrl}/${idRequerimiento}`);
  }
  crearRequerimiento(requerimiento: Requerimiento): Observable<Requerimiento> {
    return this.http.post<Requerimiento>(this.apiUrl, requerimiento);
  }
  editarRequerimiento(requerimiento: Requerimiento): Observable<Requerimiento> {
    return this.http.post<Requerimiento>(this.apiUrl, requerimiento);
  }
  eliminarRequerimiento(idRequerimiento: number) {
    return this.http.delete(`${this.apiUrl}/${idRequerimiento}`);
  }
}
