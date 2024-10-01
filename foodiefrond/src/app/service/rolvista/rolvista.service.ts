import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { IRolVista } from '../interface/IRolVista';

@Injectable({
  providedIn: 'root'
})
export class RolvistaService {

  private url = 'http://localhost:5165/api/ControllerRolVista';

  constructor(private http :  HttpClient) { }

  list(): Observable<IRolVista[]> {
    return  this.http.get<IRolVista[]>(`${this.url}/select`);
  }

  save(module: IRolVista): Observable<IRolVista>{

    const  headers = {'Content-Type': 'application/json'};
    return  this.http.post<IRolVista>(this.url, module, {headers: headers});

  }

  update(module: IRolVista): Observable<IRolVista> {
    const headers = { 'Content-Type': 'application/json' };
    return this.http.put<IRolVista>(`${this.url}/${module.id}`, module, { headers });
  }

  delete(id: number): Observable<void> {
    return this.http.delete<void>(`${this.url}/${id}`);
  }
}
