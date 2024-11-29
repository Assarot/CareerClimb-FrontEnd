import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class InsertarDatosService {
  private apiUrl = 'http://localhost:9090/api/excel/upload';
  constructor(private http: HttpClient) {}

  uploadFile(file: File): Observable<string> {
    const formData = new FormData();
    formData.append('file', file);
    return this.http.post<string>(this.apiUrl, formData, {
      responseType: 'text' as 'json',
    });
  }
}
