import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { IRecetaIngrediente } from '../interface/IRecetaIngrediente';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class RecetaingredienteService {

  private apiUrl = 'http://localhost:9191/api/ControllerRecetaIngrediente';

  constructor(private http: HttpClient) {}

  list(): Observable<IRecetaIngrediente[]> {
    return this.http.get<IRecetaIngrediente[]>(`${this.apiUrl}`);
  }

  getById(id: number): Observable<IRecetaIngrediente> {
    return this.http.get<IRecetaIngrediente>(`${this.apiUrl}/${id}`);
  }

  save(recetaIngrediente: IRecetaIngrediente): Observable<IRecetaIngrediente> {
    return this.http.post<IRecetaIngrediente>(this.apiUrl, recetaIngrediente);
  }

  update(recetaIngrediente: IRecetaIngrediente): Observable<IRecetaIngrediente> {
    return this.http.put<IRecetaIngrediente>(`${this.apiUrl}/${recetaIngrediente.id}`, recetaIngrediente);
  }

  delete(id: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${id}`);
  }
}
