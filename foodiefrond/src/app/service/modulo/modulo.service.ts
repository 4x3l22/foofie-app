import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { IModulo } from '../interface/IModulo';

@Injectable({
  providedIn: 'root'
})
export class ModuloService {

  private url = 'http://localhost:9191/api/Modulo';

  constructor(private http :  HttpClient) { }

  list(): Observable<IModulo[]> {
    return  this.http.get<IModulo[]>(`${this.url}/select`);
  }

  save(module: IModulo): Observable<IModulo>{

    const  headers = {'Content-Type': 'application/json'};
    return  this.http.post<IModulo>(this.url, module, {headers: headers});

  }

  update(module: IModulo): Observable<IModulo> {
    const headers = { 'Content-Type': 'application/json' };
    return this.http.put<IModulo>(`${this.url}/${module.id}`, module, { headers });
  }

  delete(id: number): Observable<void> {
    return this.http.delete<void>(`${this.url}/${id}`);
  }
}
