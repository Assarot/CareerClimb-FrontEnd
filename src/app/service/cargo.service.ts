import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Cargo } from '../model/cargo';

@Injectable({
  providedIn: 'root',
})
export class CargoService {
  private apiUrl = 'http://localhost:8080/api/cargos';
  constructor(private http: HttpClient) {}

  getCargos(): Observable<Cargo[]> {
    return this.http.get<Cargo[]>(this.apiUrl);
  }
  getCargoById(idCargo: number): Observable<Cargo> {
    return this.http.get<Cargo>(`${this.apiUrl}/${idCargo}`);
  }
  crearCargo(acceso: Cargo): Observable<Cargo> {
    return this.http.post<Cargo>(this.apiUrl, acceso);
  }
  editarCargo(acceso: Cargo): Observable<Cargo> {
    return this.http.post<Cargo>(this.apiUrl, acceso);
  }
  eliminarCargo(idCargo: number) {
    return this.http.delete(`${this.apiUrl}/${idCargo}`);
  }
}
