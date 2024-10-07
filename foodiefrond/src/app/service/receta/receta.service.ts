import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { IReceta } from '../interface/IReceta';

@Injectable({
  providedIn: 'root'
})
export class RecetaService {

  private url = 'http://localhost:9191/api/Receta';
  private msv = '/cargar-masiva';

  constructor(private http: HttpClient) { }

  list(): Observable<IReceta[]> {
    return this.http.get<IReceta[]>(`${this.url}/select`);
  }

  save(receta: IReceta): Observable<IReceta> {
    const headers = { 'Content-Type': 'application/json' };
    return this.http.post<IReceta>(this.url, receta, { headers });
  }

  saveMSV(ingredientes: IReceta[]):  Observable<IReceta[]>{
    const headers = {'Content-Type': 'application/json'};
    return this.http.post<IReceta[]>(this.url+this.msv,  ingredientes, {headers: headers});
  }

  update(receta: IReceta): Observable<IReceta> {
    const headers = { 'Content-Type': 'application/json' };
    return this.http.put<IReceta>(`${this.url}/${receta.id}`, receta, { headers });
  }

  delete(id: number): Observable<void> {
    return this.http.delete<void>(`${this.url}/${id}`);
  }
}
