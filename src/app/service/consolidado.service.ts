import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, map } from 'rxjs';
import { Consolidado } from '../model/consolidado';

@Injectable({
  providedIn: 'root',
})
export class ConsolidadoService {
  private baseUrl = 'http://localhost:8080/api/fileManager';

  constructor(private http: HttpClient) {}

  getFiles(): Observable<Consolidado[]> {
    return this.http.get<Consolidado[]>(`${this.baseUrl}/files`).pipe(
      map((data: any[]) =>
        data.map(
          (file) =>
            new Consolidado(
              file.id,
              file.name,
              file.url,
              file.type,
              file.size,
              file.fechaSubida, 
              0, 
              file.detallePPPId 
            )
        )
      )
    );
  }

  getFileMetadata(id: number): Observable<Consolidado> {
    return this.http.get<Consolidado>(`${this.baseUrl}/files/${id}`).pipe(
      map(
        (file) =>
          new Consolidado(
            file.id,
            file.name,
            file.url,
            file.type,
            file.size,
            file.fechaSubida,
            0,
            file.idPPP
          )
      )
    );
  }

  getFileForPreview(id: number): Observable<Blob> {
    const url = `${this.baseUrl}/files/view/${id}`; 
    return this.http.get(url, { responseType: 'blob' }); 
  }

  uploadFiles(files: File[], idPPP?: number): Observable<string[]> {
    const formData = new FormData();
    files.forEach((file) => formData.append('file', file, file.name));

    if (idPPP !== undefined && idPPP !== null) {
      formData.append('detallePPPId', idPPP.toString());
    }

    return this.http
      .post<any>(`${this.baseUrl}/upload`, formData)
      .pipe(map((responses: any[]) => responses.map((res) => res.message)));
  }

  deleteFile(id: number): Observable<string> {
    return this.http.delete(`${this.baseUrl}/files/${id}`, {
      responseType: 'text',
    });
  }
}
