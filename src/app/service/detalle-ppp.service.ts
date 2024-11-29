import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { DetallePPP } from '../model/detalle-ppp';

@Injectable({
  providedIn: 'root',
})
export class DetallePPPService {
  private apiUrl = 'http://localhost:8080/api/detalle-ppp';
  constructor(private http: HttpClient) {}

  getDetallePPPs(): Observable<DetallePPP[]> {
    return this.http.get<DetallePPP[]>(this.apiUrl);
  }
  getDetallePPPById(idDetallePPP: number): Observable<DetallePPP> {
    return this.http.get<DetallePPP>(`${this.apiUrl}/${idDetallePPP}`);
  }
  crearDetallePPP(detalleppp: DetallePPP): Observable<DetallePPP> {
    return this.http.post<DetallePPP>(this.apiUrl, detalleppp);
  }
  editarDetallePPP(detalleppp: DetallePPP): Observable<DetallePPP> {
    return this.http.post<DetallePPP>(this.apiUrl, detalleppp);
  }
  eliminarDetallePPP(idDetallePPP: number) {
    return this.http.delete(`${this.apiUrl}/${idDetallePPP}`);
  }
}
