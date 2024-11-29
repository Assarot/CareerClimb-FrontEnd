import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Rol } from '../model/rol';
@Injectable({
  providedIn: 'root',
})
export class RolService {
  private apiUrl = 'http://localhost:8080/api/roles';
  constructor(private http: HttpClient) {}

  getRoles(): Observable<Rol[]> {
    return this.http.get<Rol[]>(this.apiUrl);
  }
  getRolId(idRol: number): Observable<Rol> {
    return this.http.get<Rol>(`${this.apiUrl}/${idRol}`);
  }
  crearRol(rol: Rol): Observable<Rol> {
    return this.http.post<Rol>(this.apiUrl, rol);
  }
  editarRol(rol: Rol): Observable<Rol> {
    return this.http.post<Rol>(this.apiUrl, rol);
  }
  eliminarRol(idRol: number) {
    return this.http.delete(`${this.apiUrl}/${idRol}`);
  }
}
