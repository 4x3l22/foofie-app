import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { IMediosPago } from '../interface/IMediosPago';

@Injectable({
  providedIn: 'root'
})
export class MediospagoService {

  private url = 'http://localhost:5165/api/ControllerMediosPago';

  constructor(private http :  HttpClient) { }

  list(): Observable<IMediosPago[]> {
    return  this.http.get<IMediosPago[]>(`${this.url}/select`);
  }

  save(module: IMediosPago): Observable<IMediosPago>{

    const  headers = {'Content-Type': 'application/json'};
    return  this.http.post<IMediosPago>(this.url, module, {headers: headers});

  }

  update(module: IMediosPago): Observable<IMediosPago> {
    const headers = { 'Content-Type': 'application/json' };
    return this.http.put<IMediosPago>(`${this.url}/${module.id}`, module, { headers });
  }

  delete(id: number): Observable<void> {
    return this.http.delete<void>(`${this.url}/${id}`);
  }
}
