import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { IRecetario } from '../interface/IRecetario';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class RecetarioService {

  private url = 'http://localhost:9191/api/Recetario';

  constructor(private http:  HttpClient) { }

  save(recetario: IRecetario): Observable<IRecetario>{
    const headers = {  'Content-Type': 'application/json' };
    return this.http.post<IRecetario>(this.url, recetario,  { headers:  headers });
  }

}
