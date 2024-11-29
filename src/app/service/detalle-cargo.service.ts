import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { DetalleCargo } from '../model/detalle-cargo';

@Injectable({
  providedIn: 'root',
})
export class DetalleCargoService {
  private apiUrl = 'http://localhost:8080/api/detalle-cargos';
  constructor(private http: HttpClient) {}

  getDetalleCargos(): Observable<DetalleCargo[]> {
    return this.http.get<DetalleCargo[]>(this.apiUrl);
  }
  getDetalleCargoById(idDetalleCargo: number): Observable<DetalleCargo> {
    return this.http.get<DetalleCargo>(`${this.apiUrl}/${idDetalleCargo}`);
  }
  crearDetalleCargo(detallecargo: DetalleCargo): Observable<DetalleCargo> {
    return this.http.post<DetalleCargo>(this.apiUrl, detallecargo);
  }
  editarDetalleCargo(detallecargo: DetalleCargo): Observable<DetalleCargo> {
    return this.http.post<DetalleCargo>(this.apiUrl, detallecargo);
  }
  eliminarDetalleCargo(idDetalleCargo: number) {
    return this.http.delete(`${this.apiUrl}/${idDetalleCargo}`);
  }
}
