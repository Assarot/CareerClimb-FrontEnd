import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { PerfilUsuario } from '../model/perfil-usuario';

@Injectable({
  providedIn: 'root',
})
export class PerfilUsuarioService {
  private apiUrl = 'http://localhost:8080/api/perfiles-usuario';
  constructor(private http: HttpClient) {}

  getPerfilUsuarios(): Observable<PerfilUsuario[]> {
    return this.http.get<PerfilUsuario[]>(this.apiUrl);
  }
  getPerfilUsuarioById(idPerfilUsuario: number): Observable<PerfilUsuario> {
    return this.http.get<PerfilUsuario>(`${this.apiUrl}/${idPerfilUsuario}`);
  }
  crearPerfilUsuario(perfilUsuario: PerfilUsuario): Observable<PerfilUsuario> {
    return this.http.post<PerfilUsuario>(this.apiUrl, perfilUsuario);
  }
  editarPerfilUsuario(perfilUsuario: PerfilUsuario): Observable<PerfilUsuario> {
    return this.http.post<PerfilUsuario>(this.apiUrl, perfilUsuario);
  }
  eliminarPerfilUsuario(idPerfilUsuario: number) {
    return this.http.delete(`${this.apiUrl}/${idPerfilUsuario}`);
  }
}
