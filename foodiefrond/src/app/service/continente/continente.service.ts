import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { IContinente } from '../interface/IContinente';

@Injectable({
  providedIn: 'root'
})
export class ContinenteService {

  private url = 'http://localhost:9191/api/ControllerContinente';

  constructor(private http :  HttpClient) { }

  list(): Observable<IContinente[]> {
    return  this.http.get<IContinente[]>(`${this.url}/select`);
  }

  save(module: IContinente): Observable<IContinente>{

    const  headers = {'Content-Type': 'application/json'};
    return  this.http.post<IContinente>(this.url, module, {headers: headers});

  }

  update(module: IContinente): Observable<IContinente> {
    const headers = { 'Content-Type': 'application/json' };
    return this.http.put<IContinente>(`${this.url}/${module.id}`, module, { headers });
  }

  delete(id: number): Observable<void> {
    return this.http.delete<void>(`${this.url}/${id}`);
  }
}
