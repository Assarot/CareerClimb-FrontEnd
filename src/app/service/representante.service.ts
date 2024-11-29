import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Representante } from '../model/representante';

@Injectable({
  providedIn: 'root',
})
export class RepresentanteService {
  private apiUrl = 'http://localhost:8080/api/representantes';
  constructor(private http: HttpClient) {}

  getRepresentantes(): Observable<Representante[]> {
    return this.http.get<Representante[]>(this.apiUrl);
  }
  getRepresentanteId(idRepresentante: number): Observable<Representante> {
    return this.http.get<Representante>(`${this.apiUrl}/${idRepresentante}`);
  }
  crearRepresentante(representante: Representante): Observable<Representante> {
    return this.http.post<Representante>(this.apiUrl, representante);
  }
  editarRepresentante(representante: Representante): Observable<Representante> {
    return this.http.post<Representante>(this.apiUrl, representante);
  }
  eliminarRepresentante(idRepresentante: number) {
    return this.http.delete(`${this.apiUrl}/${idRepresentante}`);
  }
}
