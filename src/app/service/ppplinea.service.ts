import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { PPPLinea } from '../model/ppplinea';
@Injectable({
  providedIn: 'root',
})
export class PPPLineaService {
  private apiUrl = 'http://localhost:8080/api/ppp-lineas';
  constructor(private http: HttpClient) {}

  getPPPLineas(): Observable<PPPLinea[]> {
    return this.http.get<PPPLinea[]>(this.apiUrl);
  }
  getPPPLineaId(idPPPLinea: number): Observable<PPPLinea> {
    return this.http.get<PPPLinea>(`${this.apiUrl}/${idPPPLinea}`);
  }
  crearPPPLinea(ppplinea: PPPLinea): Observable<PPPLinea> {
    return this.http.post<PPPLinea>(this.apiUrl, ppplinea);
  }
  editarPPPLinea(ppplinea: PPPLinea): Observable<PPPLinea> {
    return this.http.post<PPPLinea>(this.apiUrl, ppplinea);
  }
  eliminarPPPLinea(idPPPLinea: number) {
    return this.http.delete(`${this.apiUrl}/${idPPPLinea}`);
  }
}
