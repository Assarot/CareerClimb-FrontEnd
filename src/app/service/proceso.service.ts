import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Proceso } from '../model/proceso';
@Injectable({
  providedIn: 'root',
})
export class ProcesoService {
  private apiUrl = 'http://localhost:8080/api/procesos';
  constructor(private http: HttpClient) {}

  getProcesos(): Observable<Proceso[]> {
    return this.http.get<Proceso[]>(this.apiUrl);
  }
  getProcesoId(idProceso: number): Observable<Proceso> {
    return this.http.get<Proceso>(`${this.apiUrl}/${idProceso}`);
  }
  crearProceso(proceso: Proceso): Observable<Proceso> {
    return this.http.post<Proceso>(this.apiUrl, proceso);
  }
  editarProceso(proceso: Proceso): Observable<Proceso> {
    return this.http.post<Proceso>(this.apiUrl, proceso);
  }
  eliminarProceso(idProceso: number) {
    return this.http.delete(`${this.apiUrl}/${idProceso}`);
  }
}
