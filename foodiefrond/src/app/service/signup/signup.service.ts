import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { IPersona } from '../interface/IPersona';

@Injectable({
  providedIn: 'root'
})
export class SignupService {

  private url = 'http://localhost:5165/api/ControllerPersona';

  constructor(private http :  HttpClient) { }

  list(): Observable<IPersona[]> {
    return  this.http.get<IPersona[]>(`${this.url}/select`);
  }

  save(module: IPersona): Observable<IPersona>{

    const  headers = {'Content-Type': 'application/json'};
    return  this.http.post<IPersona>(this.url, module, {headers: headers});

  }

  update(module: IPersona): Observable<IPersona> {
    const headers = { 'Content-Type': 'application/json' };
    return this.http.put<IPersona>(`${this.url}/${module.id}`, module, { headers });
  }

  delete(id: number): Observable<void> {
    return this.http.delete<void>(`${this.url}/${id}`);
  }
}
