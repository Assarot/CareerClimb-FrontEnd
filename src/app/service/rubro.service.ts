import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Rubro } from '../model/rubro';

@Injectable({
  providedIn: 'root',
})
export class RubroService {
  private apiUrl = 'http://localhost:8080/api/rubros';
  constructor(private http: HttpClient) {}

  getRubros(): Observable<Rubro[]> {
    return this.http.get<Rubro[]>(this.apiUrl);
  }
  getRubroId(idRubro: number): Observable<Rubro> {
    return this.http.get<Rubro>(`${this.apiUrl}/${idRubro}`);
  }
  crearRubro(rubro: Rubro): Observable<Rubro> {
    return this.http.post<Rubro>(this.apiUrl, rubro);
  }
  editarRubro(rubro: Rubro): Observable<Rubro> {
    return this.http.post<Rubro>(this.apiUrl, rubro);
  }
  eliminarRubro(idRubro: number) {
    return this.http.delete(`${this.apiUrl}/${idRubro}`);
  }
}
