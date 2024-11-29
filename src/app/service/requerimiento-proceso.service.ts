import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { RequerimientoProceso } from '../model/requerimiento-proceso';

@Injectable({
  providedIn: 'root',
})
export class RequerimientoProcesoService {
  private apiUrl = 'http://localhost:8080/api/requerimiento-procesos';
  constructor(private http: HttpClient) {}

  getRequerimientoProcesos(): Observable<RequerimientoProceso[]> {
    return this.http.get<RequerimientoProceso[]>(this.apiUrl);
  }
  getRequerimientoProcesoId(
    idRequerimientoProceso: number
  ): Observable<RequerimientoProceso> {
    return this.http.get<RequerimientoProceso>(
      `${this.apiUrl}/${idRequerimientoProceso}`
    );
  }
  crearRequerimientoProceso(
    requerimientoProceso: RequerimientoProceso
  ): Observable<RequerimientoProceso> {
    return this.http.post<RequerimientoProceso>(
      this.apiUrl,
      requerimientoProceso
    );
  }
  editarRequerimientoProceso(
    requerimientoProceso: RequerimientoProceso
  ): Observable<RequerimientoProceso> {
    return this.http.post<RequerimientoProceso>(
      this.apiUrl,
      requerimientoProceso
    );
  }
  eliminarRequerimientoProceso(idRequerimientoProceso: number) {
    return this.http.delete(`${this.apiUrl}/${idRequerimientoProceso}`);
  }
}
