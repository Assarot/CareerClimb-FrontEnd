import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Matricula } from '../model/matricula';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class MatriculaService {
  private apiUrl = 'http://localhost:8080/api/matriculas';
  constructor(private http: HttpClient) {}

  getLineas(): Observable<Matricula[]> {
    return this.http.get<Matricula[]>(this.apiUrl);
  }
  getLineaById(idMatricula: number): Observable<Matricula> {
    return this.http.get<Matricula>(`${this.apiUrl}/${idMatricula}`);
  }
  crearLinea(matricula: Matricula): Observable<Matricula> {
    return this.http.post<Matricula>(this.apiUrl, matricula);
  }
  editarLinea(matricula: Matricula): Observable<Matricula> {
    return this.http.post<Matricula>(this.apiUrl, matricula);
  }
  eliminarLinea(idMatricula: number) {
    return this.http.delete(`${this.apiUrl}/${idMatricula}`);
  }
}
