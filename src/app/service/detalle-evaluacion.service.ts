import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { DetalleEvaluacion } from '../model/detalle-evaluacion';

@Injectable({
  providedIn: 'root',
})
export class DetalleEvaluacionService {
  private apiUrl = 'http://localhost:8080/api/detalle-evaluaciones';
  constructor(private http: HttpClient) {}

  getDetalleEvaluaciones(): Observable<DetalleEvaluacion[]> {
    return this.http.get<DetalleEvaluacion[]>(this.apiUrl);
  }
  getDetalleEvaluacionById(
    idDetalleEvaluacion: number
  ): Observable<DetalleEvaluacion> {
    return this.http.get<DetalleEvaluacion>(
      `${this.apiUrl}/${idDetalleEvaluacion}`
    );
  }
  crearDetalleEvaluacion(
    detalleevaluacion: DetalleEvaluacion
  ): Observable<DetalleEvaluacion> {
    return this.http.post<DetalleEvaluacion>(this.apiUrl, detalleevaluacion);
  }
  editarDetalleEvaluacion(
    detalleevaluacion: DetalleEvaluacion
  ): Observable<DetalleEvaluacion> {
    return this.http.post<DetalleEvaluacion>(this.apiUrl, detalleevaluacion);
  }
  eliminarDetalleEvaluacion(idDetalleEvaluacion: number) {
    return this.http.delete(`${this.apiUrl}/${idDetalleEvaluacion}`);
  }
}
