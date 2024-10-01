import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { IRol } from '../interface/IRol';

@Injectable({
  providedIn: 'root'
})
export class RolService {

  private url = 'http://localhost:5165/api/ControllerRol';

  constructor(private http :  HttpClient) { }

  list(): Observable<IRol[]> {
    return  this.http.get<IRol[]>(`${this.url}/select`);
  }

  save(module: IRol): Observable<IRol>{

    const  headers = {'Content-Type': 'application/json'};
    return  this.http.post<IRol>(this.url, module, {headers: headers});

  }

  update(module: IRol): Observable<IRol> {
    const headers = { 'Content-Type': 'application/json' };
    return this.http.put<IRol>(`${this.url}/${module.id}`, module, { headers });
  }

  delete(id: number): Observable<void> {
    return this.http.delete<void>(`${this.url}/${id}`);
  }
}
