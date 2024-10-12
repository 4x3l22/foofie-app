import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { IPublicacion } from '../interface/IPublicacion';
import { HttpClient } from '@angular/common/http';
import { IPublica } from '../interface/IPublica';

@Injectable({
  providedIn: 'root'
})
export class PublicacionService {
  private url = 'http://localhost:9191/api/Publicaciones';

  constructor(private  http: HttpClient) { }

  loadpublic(): Observable<IPublica[]>{
    return  this.http.get<IPublica[]>(`${this.url}/p-select`);
  }

  save(publicacion: IPublicacion): Observable<IPublicacion>{
    const  headers = {'Content-Type': 'application/json'};
    return this.http.post<IPublicacion>(this.url, publicacion,  {headers: headers});
  }
}
