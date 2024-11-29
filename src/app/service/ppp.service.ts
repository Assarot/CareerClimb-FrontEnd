import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { PPP } from '../model/ppp';
@Injectable({
  providedIn: 'root'
})
export class PPPService {

  private apiUrl ='http://localhost:8080/api/ppp';
  constructor(private http: HttpClient) { }

  getPPP(): Observable<PPP[]> {
    return this.http.get<PPP[]>(this.apiUrl);
  }
  getPPPId(idPPP: number): Observable<PPP> {
    return this.http.get<PPP>(`${this.apiUrl}/${idPPP}`);
  }
  crearPPP(ppp: PPP): Observable<PPP> {
    return this.http.post<PPP>(this.apiUrl, ppp);
  }
  editarPPP(ppp: PPP):Observable<PPP>{
    return this.http.post<PPP>(this.apiUrl,ppp);
  }
  eliminarPPP(idPPP: number) {
    return this.http.delete(`${this.apiUrl}/${idPPP}`);
  }
}
