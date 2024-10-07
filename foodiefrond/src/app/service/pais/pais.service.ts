import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { IPais } from '../interface/IPais';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class PaisService {

  private url = 'http://localhost:9191/api/Pais';

  constructor(private http :  HttpClient) { }

  list(): Observable<IPais[]> {
    return  this.http.get<IPais[]>(`${this.url}/select`);
  }

  save(module: IPais): Observable<IPais>{

    const  headers = {'Content-Type': 'application/json'};
    return  this.http.post<IPais>(this.url, module, {headers: headers});

  }

  update(module: IPais): Observable<IPais> {
    const headers = { 'Content-Type': 'application/json' };
    return this.http.put<IPais>(`${this.url}/${module.id}`, module, { headers });
  }

  delete(id: number): Observable<void> {
    return this.http.delete<void>(`${this.url}/${id}`);
  }
}
