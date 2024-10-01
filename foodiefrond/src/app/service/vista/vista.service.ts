import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { IVista } from '../interface/IVista';

@Injectable({
  providedIn: 'root'
})
export class VistaService {

  private url = 'http://localhost:5165/api/ControllerVista';

  constructor(private http :  HttpClient) { }

  list(): Observable<IVista[]> {
    return  this.http.get<IVista[]>(`${this.url}/select`);
  }

  save(module: IVista): Observable<IVista>{

    const  headers = {'Content-Type': 'application/json'};
    return  this.http.post<IVista>(this.url, module, {headers: headers});

  }

  update(module: IVista): Observable<IVista> {
    const headers = { 'Content-Type': 'application/json' };
    return this.http.put<IVista>(`${this.url}/${module.id}`, module, { headers });
  }

  delete(id: number): Observable<void> {
    return this.http.delete<void>(`${this.url}/${id}`);
  }
}
