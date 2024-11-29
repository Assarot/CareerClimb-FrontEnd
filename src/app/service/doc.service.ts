import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, map } from 'rxjs';
import { Doc } from '../model/doc';

@Injectable({
  providedIn: 'root',
})
export class DocService {
  private baseUrl = 'http://localhost:8080/api/docManager';

  constructor(private http: HttpClient) {}

  // Obtener todos los documentos
  getFiles(): Observable<Doc[]> {
    return this.http
      .get<Doc[]>(`${this.baseUrl}/all`)
      .pipe(
        map((data: any[]) =>
          data.map(
            (file) =>
              new Doc(
                file.id,
                file.nombre,
                file.ruta,
                file.tipo,
                file.fechaSubida,
                file.estado,
                file.idDetalleDoc
              )
          )
        )
      );
  }

  // Obtener metadatos de un archivo específico
  ggetFileMetadata(id: number): Observable<Doc> {
    return this.http
      .get<Doc>(`${this.baseUrl}/metadata/${id}`)
      .pipe(
        map(
          (file) =>
            new Doc(
              file.id,
              file.nombre,
              file.ruta,
              file.tipo,
              file.fechaSubida,
              file.estado,
              file.idDetalleDoc
            )
        )
      );
  }

  // Obtener archivo para vista previa o descarga
  getFileForPreview(id: number): Observable<Blob> {
    const url = `${this.baseUrl}/${id}`;
    return this.http.get(url, { responseType: 'blob' });
  }

  // Subir archivo al backend
  uploadFiles(
    file: File,
    nombreDetalle: string
  ): Observable<{ message: string }> {
    const formData = new FormData();
    formData.append('file', file, file.name);
    formData.append('nombreDetalle', nombreDetalle);
    formData.append('estado', 'Pendiente');
    formData.append('isActive', 'A');

    return this.http.post<{ message: string }>(
      `${this.baseUrl}/upload`,
      formData
    );
  }
  // Eliminar un archivo por su ID
  deleteFile(id: number): Observable<string> {
    return this.http.delete(`${this.baseUrl}/${id}`, {
      responseType: 'text',
    });
  }
}
