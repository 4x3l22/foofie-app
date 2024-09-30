import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { IIngrediente } from '../interface/IIngredientes';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class IngredientesService {

  private url = 'http://localhost:5165/api/ControllerIngredientes';

  constructor(private http :  HttpClient) { }

  list(): Observable<IIngrediente[]> {
    return  this.http.get<IIngrediente[]>(`${this.url}/select`);
  }

  save(module: IIngrediente): Observable<IIngrediente>{

    const  headers = {'Content-Type': 'application/json'};
    return  this.http.post<IIngrediente>(this.url, module, {headers: headers});

  }

  update(module: IIngrediente): Observable<IIngrediente> {
    const headers = { 'Content-Type': 'application/json' };
    return this.http.put<IIngrediente>(`${this.url}/${module.id}`, module, { headers });
  }

  delete(id: number): Observable<void> {
    return this.http.delete<void>(`${this.url}/${id}`);
  }
}
