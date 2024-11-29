import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Solicitud } from '../model/solicitud';

@Injectable({
  providedIn: 'root'
})
export class SolicitudService {

  private apiUrl ='http://localhost:8080/api/solicitudes';
  constructor(private http: HttpClient) { }

  getSolicitudes(): Observable<Solicitud[]> {
    return this.http.get<Solicitud[]>(this.apiUrl);
  }
  getSolicitudId(idSolicitud: number): Observable<Solicitud> {
    return this.http.get<Solicitud>(`${this.apiUrl}/${idSolicitud}`);
  }
  crearSolicitud(solicitud: Solicitud): Observable<Solicitud> {
    return this.http.post<Solicitud>(this.apiUrl, solicitud);
  }
  editarSolicitud(solicitud: Solicitud):Observable<Solicitud>{
    return this.http.post<Solicitud>(this.apiUrl,solicitud);
  }
  eliminarSolicitud(idSolicitud: number) {
    return this.http.delete(`${this.apiUrl}/${idSolicitud}`);
  }
}
