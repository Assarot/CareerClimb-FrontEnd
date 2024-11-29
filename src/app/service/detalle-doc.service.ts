import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { DetalleDoc } from '../model/detalle-doc';

@Injectable({
  providedIn: 'root',
})
export class DetalleDocService {
  private apiUrl = 'http://localhost:8080/api/detalle-docs';
  constructor(private http: HttpClient) {}

  getDetalleDocs(): Observable<DetalleDoc[]> {
    return this.http.get<DetalleDoc[]>(this.apiUrl);
  }
  getDetalleDocById(idDetalleDoc: number): Observable<DetalleDoc> {
    return this.http.get<DetalleDoc>(`${this.apiUrl}/${idDetalleDoc}`);
  }
  crearDetalleDoc(detalledoc: DetalleDoc): Observable<DetalleDoc> {
    return this.http.post<DetalleDoc>(this.apiUrl, detalledoc);
  }
  editarDetalleDoc(detalledoc: DetalleDoc): Observable<DetalleDoc> {
    return this.http.post<DetalleDoc>(this.apiUrl, detalledoc);
  }
  eliminarDetalleDoc(idDetalleDoc: number) {
    return this.http.delete(`${this.apiUrl}/${idDetalleDoc}`);
  }
}
