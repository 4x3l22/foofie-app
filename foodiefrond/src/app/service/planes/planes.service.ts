import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { IPlanes } from '../interface/IPlanes';

@Injectable({
  providedIn: 'root'
})
export class PlanesService {

  private url = 'http://localhost:9191/api/ControllerPlanes';

  constructor(private http :  HttpClient) { }

  list(): Observable<IPlanes[]> {
    return  this.http.get<IPlanes[]>(`${this.url}/select`);
  }

  save(module: IPlanes): Observable<IPlanes>{

    const  headers = {'Content-Type': 'application/json'};
    return  this.http.post<IPlanes>(this.url, module, {headers: headers});

  }

  update(module: IPlanes): Observable<IPlanes> {
    const headers = { 'Content-Type': 'application/json' };
    return this.http.put<IPlanes>(`${this.url}/${module.id}`, module, { headers });
  }

  delete(id: number): Observable<void> {
    return this.http.delete<void>(`${this.url}/${id}`);
  }
}
