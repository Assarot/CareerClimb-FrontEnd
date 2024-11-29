import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Img } from '../model/img';

@Injectable({
  providedIn: 'root',
})
export class ImgService {
  private apiUrl = 'http://localhost:8080/api/imgs';
  constructor(private http: HttpClient) {}

  getImgs(): Observable<Img[]> {
    return this.http.get<Img[]>(this.apiUrl);
  }
  getImgById(idImg: number): Observable<Img> {
    return this.http.get<Img>(`${this.apiUrl}/${idImg}`);
  }
  crearImg(img: Img): Observable<Img> {
    return this.http.post<Img>(this.apiUrl, img);
  }
  editarImg(img: Img): Observable<Img> {
    return this.http.post<Img>(this.apiUrl, img);
  }
  eliminarImg(idImg: number) {
    return this.http.delete(`${this.apiUrl}/${idImg}`);
  }
}
