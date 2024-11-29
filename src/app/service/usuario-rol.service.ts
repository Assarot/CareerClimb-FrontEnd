import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { UsuarioRol } from '../model/usuario-rol';

@Injectable({
  providedIn: 'root',
})
export class UsuarioRolService {
  private apiUrl = 'http://localhost:8080/api/usuario-roles';
  constructor(private http: HttpClient) {}

  getUsuarioRoles(): Observable<UsuarioRol[]> {
    return this.http.get<UsuarioRol[]>(this.apiUrl);
  }
  getUsuarioRolId(idUsuarioRol: number): Observable<UsuarioRol> {
    return this.http.get<UsuarioRol>(`${this.apiUrl}/${idUsuarioRol}`);
  }
  crearUsuarioRol(usuarioRol: UsuarioRol): Observable<UsuarioRol> {
    return this.http.post<UsuarioRol>(this.apiUrl, usuarioRol);
  }
  editarUsuarioRol(usuarioRol: UsuarioRol): Observable<UsuarioRol> {
    return this.http.post<UsuarioRol>(this.apiUrl, usuarioRol);
  }
  eliminarUsuarioRol(idUsuarioRol: number) {
    return this.http.delete(`${this.apiUrl}/${idUsuarioRol}`);
  }
}
