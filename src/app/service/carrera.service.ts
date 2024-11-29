import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Carrera } from '../model/carrera';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class CarreraService {
  private apiUrl = 'http://localhost:8080/api/carreras';
  constructor(private http: HttpClient) {}

  getCarreras(): Observable<Carrera[]> {
    return this.http.get<Carrera[]>(this.apiUrl);
  }
  getCarreraById(idCarrera: number): Observable<Carrera> {
    return this.http.get<Carrera>(`${this.apiUrl}/${idCarrera}`);
  }
  crearCarrera(carrera: Carrera): Observable<Carrera> {
    return this.http.post<Carrera>(this.apiUrl, carrera);
  }
  editarCarrera(carrera: Carrera): Observable<Carrera> {
    return this.http.post<Carrera>(this.apiUrl, carrera);
  }
  eliminarCarrera(idCarrera: number) {
    return this.http.delete(`${this.apiUrl}/${idCarrera}`);
  }
}
