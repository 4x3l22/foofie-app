import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { IPersona } from '../interface/IPersona';
import { IUsuarioi } from '../interface/IUsuario';

@Injectable({
  providedIn: 'root'
})
export class SignupService {

  private url = 'http://localhost:5165/api/ControllerPersona';
  private urlUser = 'http://localhost:5165/api/ControllerUsuario';

  constructor(private http :  HttpClient) { }

  list(): Observable<IPersona[]> {
    return  this.http.get<IPersona[]>(`${this.url}/select`);
  }

  save(persona: IPersona): Observable<IPersona>{

    const  headers = {'Content-Type': 'application/json'};
    return  this.http.post<IPersona>(this.url, persona, {headers: headers});

  }

  saveUser(usuario: IUsuarioi): Observable<IUsuarioi>{

    const headers =  {'Content-Type': 'application/json'};
    return this.http.post<IUsuarioi>(this.urlUser, usuario, {headers: headers});

  }

  update(persona: IPersona): Observable<IPersona> {
    const headers = { 'Content-Type': 'application/json' };
    return this.http.put<IPersona>(`${this.url}/${persona.id}`, persona, { headers });
  }

  delete(id: number): Observable<void> {
    return this.http.delete<void>(`${this.url}/${id}`);
  }
}
