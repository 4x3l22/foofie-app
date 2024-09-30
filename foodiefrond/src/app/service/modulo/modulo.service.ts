import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { IModulo } from '../interface/IModulo';

@Injectable({
  providedIn: 'root'
})
export class ModuloService {

  private url = 'http://localhost:5165/api/ControllerModulo/select';

  constructor(private http :  HttpClient) { }

  getModulo(): Observable<IModulo[]> {
    return  this.http.get<IModulo[]>(this.url);
  }
}
