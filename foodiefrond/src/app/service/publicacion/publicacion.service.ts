import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { IPublicacion } from '../interface/IPublicacion';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class PublicacionService {
  private url = 'http://localhost:9191/api/Publicaciones';

  constructor(private  http: HttpClient) { }

  save(publicacion: IPublicacion): Observable<IPublicacion>{
    const  headers = {'Content-Type': 'application/json'};
    return this.http.post<IPublicacion>(this.url, publicacion,  {headers: headers});
  }
}
