import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { PlanCarrera } from '../model/plan-carrera';

@Injectable({
  providedIn: 'root',
})
export class PlanCarreraService {
  private apiUrl = 'http://localhost:8080/api/plan-carreras';
  constructor(private http: HttpClient) {}

  getPLanCarreras(): Observable<PlanCarrera[]> {
    return this.http.get<PlanCarrera[]>(this.apiUrl);
  }
  getPLanCarreraId(idPlanCarrera: number): Observable<PlanCarrera> {
    return this.http.get<PlanCarrera>(`${this.apiUrl}/${idPlanCarrera}`);
  }
  crearPLanCarrera(planCarrera: PlanCarrera): Observable<PlanCarrera> {
    return this.http.post<PlanCarrera>(this.apiUrl, planCarrera);
  }
  editarPLanCarrera(planCarrera: PlanCarrera): Observable<PlanCarrera> {
    return this.http.post<PlanCarrera>(this.apiUrl, planCarrera);
  }
  eliminarPLanCarrera(idPlanCarrera: number) {
    return this.http.delete(`${this.apiUrl}/${idPlanCarrera}`);
  }
}
