import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { IReceta } from '../interface/IReceta';
import { IListaRecetas } from '../interface/IListaRecetas';

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

  lisRecetas(ids: number[]): Observable<IListaRecetas[]>{

    let params =  new HttpParams();
    ids.forEach(id =>{
      params = params.append('ids', id.toString());
    });

    // const headers = { 'Content-Type': 'application/json' };
    return this.http.get<IListaRecetas[]>(`${this.url}/lstreceta`, {params});
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
