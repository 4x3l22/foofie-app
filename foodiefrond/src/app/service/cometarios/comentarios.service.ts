import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { IComentarios } from '../interface/IComentarios';
import { IComen } from '../interface/IComen';

@Injectable({
  providedIn: 'root'
})
export class ComentariosService {

  private url = 'http://localhost:9191/api/Comentario';

  constructor(private http:  HttpClient) { }

  load(id: number): Observable<IComentarios[]>{
    return this.http.get<IComentarios[]>(`${this.url}/c-id/${id}`);
  }

  save(comentario: IComen): Observable<IComen>{
    const headers = new HttpHeaders({'Content-Type': 'application/json'});
    return this.http.post<IComen>(this.url, comentario, {headers});
  }
}
