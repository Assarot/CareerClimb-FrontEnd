import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Evaluacion } from '../model/evaluacion';

@Injectable({
  providedIn: 'root',
})
export class EvaluacionService {
  private apiUrl = 'http://localhost:8080/api/evaluaciones';
  constructor(private http: HttpClient) {}

  getEvaluaciones(): Observable<Evaluacion[]> {
    return this.http.get<Evaluacion[]>(this.apiUrl);
  }
  getEvaluacionById(idEvaluacion: number): Observable<Evaluacion> {
    return this.http.get<Evaluacion>(`${this.apiUrl}/${idEvaluacion}`);
  }
  crearEvaluacion(evaluacion: Evaluacion): Observable<Evaluacion> {
    return this.http.post<Evaluacion>(this.apiUrl, evaluacion);
  }
  editarEvaluacion(evaluacion: Evaluacion): Observable<Evaluacion> {
    return this.http.post<Evaluacion>(this.apiUrl, evaluacion);
  }
  eliminarEvaluacion(idEvaluacion: number) {
    return this.http.delete(`${this.apiUrl}/${idEvaluacion}`);
  }
}
