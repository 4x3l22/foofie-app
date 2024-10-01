import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ITipoDocumento } from '../interface/ITipoDocumento';

@Injectable({
  providedIn: 'root'
})
export class TipodocumentoService {

  private url = 'http://localhost:5165/api/ControllerTipoDocumento';

  constructor(private http :  HttpClient) { }

  list(): Observable<ITipoDocumento[]> {
    return  this.http.get<ITipoDocumento[]>(`${this.url}/select`);
  }

  save(module: ITipoDocumento): Observable<ITipoDocumento>{

    const  headers = {'Content-Type': 'application/json'};
    return  this.http.post<ITipoDocumento>(this.url, module, {headers: headers});

  }

  update(module: ITipoDocumento): Observable<ITipoDocumento> {
    const headers = { 'Content-Type': 'application/json' };
    return this.http.put<ITipoDocumento>(`${this.url}/${module.id}`, module, { headers });
  }

  delete(id: number): Observable<void> {
    return this.http.delete<void>(`${this.url}/${id}`);
  }
}
