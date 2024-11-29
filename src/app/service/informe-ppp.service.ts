import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { InformePPP } from '../model/informe-ppp';

@Injectable({
  providedIn: 'root',
})
export class InformePPPService {
  private apiUrl = 'http://localhost:8080/api/informes-ppp';
  constructor(private http: HttpClient) {}

  getInformePPPs(): Observable<InformePPP[]> {
    return this.http.get<InformePPP[]>(this.apiUrl);
  }
  getInformePPPById(idInformePPP: number): Observable<InformePPP> {
    return this.http.get<InformePPP>(`${this.apiUrl}/${idInformePPP}`);
  }
  crearInformePPP(informeppp: InformePPP): Observable<InformePPP> {
    return this.http.post<InformePPP>(this.apiUrl, informeppp);
  }
  editarInformePPP(informeppp: InformePPP): Observable<InformePPP> {
    return this.http.post<InformePPP>(this.apiUrl, informeppp);
  }
  eliminarInformePPP(idInformePPP: number) {
    return this.http.delete(`${this.apiUrl}/${idInformePPP}`);
  }
}
