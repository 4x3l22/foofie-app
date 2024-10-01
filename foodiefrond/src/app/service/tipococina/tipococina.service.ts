import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ITipoCocina } from '../interface/ITipoCocina';

@Injectable({
  providedIn: 'root'
})
export class TipococinaService {

  private url = 'http://localhost:5165/api/ControllerTipoCocina';

  constructor(private http :  HttpClient) { }

  list(): Observable<ITipoCocina[]> {
    return  this.http.get<ITipoCocina[]>(`${this.url}/select`);
  }

  save(module: ITipoCocina): Observable<ITipoCocina>{

    const  headers = {'Content-Type': 'application/json'};
    return  this.http.post<ITipoCocina>(this.url, module, {headers: headers});

  }

  update(module: ITipoCocina): Observable<ITipoCocina> {
    const headers = { 'Content-Type': 'application/json' };
    return this.http.put<ITipoCocina>(`${this.url}/${module.id}`, module, { headers });
  }

  delete(id: number): Observable<void> {
    return this.http.delete<void>(`${this.url}/${id}`);
  }
}
