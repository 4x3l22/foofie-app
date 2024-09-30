import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ICiudad } from '../interface/ICiudad';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CiudadService {

  private url = 'http://localhost:5165/api/ControllerCiudad';

  constructor(private http :  HttpClient) { }

  list(): Observable<ICiudad[]> {
    return  this.http.get<ICiudad[]>(`${this.url}/select`);
  }

  save(module: ICiudad): Observable<ICiudad>{

    const  headers = {'Content-Type': 'application/json'};
    return  this.http.post<ICiudad>(this.url, module, {headers: headers});

  }

  update(module: ICiudad): Observable<ICiudad> {
    const headers = { 'Content-Type': 'application/json' };
    return this.http.put<ICiudad>(`${this.url}/${module.id}`, module, { headers });
  }

  delete(id: number): Observable<void> {
    return this.http.delete<void>(`${this.url}/${id}`);
  }
}
