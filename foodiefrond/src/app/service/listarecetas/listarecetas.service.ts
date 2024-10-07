import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { IListaRecetas } from '../interface/IListaRecetas';

@Injectable({
  providedIn: 'root'
})
export class ListarecetasService {

  private url = 'http://localhost:9191/api/Receta';

  constructor(private http:  HttpClient) { }

  getRecetas(ids: number[]):  Observable<IListaRecetas[]> {

    let params = new HttpParams();
    ids.forEach(id => {
      params = params.append('ids', id.toString());
    });
    return this.http.get<IListaRecetas[]>(`${this.url}/comidas`, { params });

  }
}
