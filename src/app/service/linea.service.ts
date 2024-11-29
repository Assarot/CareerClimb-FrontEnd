import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Linea } from '../model/linea';

@Injectable({
  providedIn: 'root',
})
export class LineaService {
  private apiUrl = 'http://localhost:8080/api/lineas';
  constructor(private http: HttpClient) {}

  getLineas(): Observable<Linea[]> {
    return this.http.get<Linea[]>(this.apiUrl);
  }
  getLineaById(idLinea: number): Observable<Linea> {
    return this.http.get<Linea>(`${this.apiUrl}/${idLinea}`);
  }
  crearLinea(linea: Linea): Observable<Linea> {
    return this.http.post<Linea>(this.apiUrl, linea);
  }
  editarLinea(linea: Linea): Observable<Linea> {
    return this.http.post<Linea>(this.apiUrl, linea);
  }
  eliminarLinea(idLinea: number) {
    return this.http.delete(`${this.apiUrl}/${idLinea}`);
  }
}
