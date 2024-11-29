import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Plan } from '../model/plan';

@Injectable({
  providedIn: 'root',
})
export class PlanService {
  private apiUrl = 'http://localhost:8080/api/planes';
  constructor(private http: HttpClient) {}

  getPlanes(): Observable<Plan[]> {
    return this.http.get<Plan[]>(this.apiUrl);
  }
  getPlanId(idPlan: number): Observable<Plan> {
    return this.http.get<Plan>(`${this.apiUrl}/${idPlan}`);
  }
  crearPlan(plan: Plan): Observable<Plan> {
    return this.http.post<Plan>(this.apiUrl, plan);
  }
  editarPlan(plan: Plan): Observable<Plan> {
    return this.http.post<Plan>(this.apiUrl, plan);
  }
  eliminarPlan(idPlan: number) {
    return this.http.delete(`${this.apiUrl}/${idPlan}`);
  }
}
