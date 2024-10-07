import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { IUsuarioRol } from '../interface/IUsuarioRol';

@Injectable({
  providedIn: 'root'
})
export class UsuariorolService {


  private url = 'http://localhost:9191/api/UsuarioRol';

  constructor(private http: HttpClient) {}

  save(usuariorol: IUsuarioRol): Observable<IUsuarioRol>{
    const  headers = {'Content-Type': 'application/json'};
    return this.http.post<IUsuarioRol>(this.url,usuariorol,{headers: headers});
  }
}
