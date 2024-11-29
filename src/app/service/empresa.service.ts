import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Empresa } from '../model/empresa';

@Injectable({
  providedIn: 'root',
})
export class EmpresaService {
  private apiUrl = 'http://localhost:8080/api/empresas';
  constructor(private http: HttpClient) {}

  getEmpresas(): Observable<Empresa[]> {
    return this.http.get<Empresa[]>(this.apiUrl);
  }
  getEmpresaById(idEmpresa: number): Observable<Empresa> {
    return this.http.get<Empresa>(`${this.apiUrl}/${idEmpresa}`);
  }
  crearEmpresa(empresa: Empresa): Observable<Empresa> {
    return this.http.post<Empresa>(this.apiUrl, empresa);
  }
  editarEmpresa(empresa: Empresa): Observable<Empresa> {
    return this.http.post<Empresa>(this.apiUrl, empresa);
  }
  eliminarEmpresa(idEmpresa: number) {
    return this.http.delete(`${this.apiUrl}/${idEmpresa}`);
  }
}
