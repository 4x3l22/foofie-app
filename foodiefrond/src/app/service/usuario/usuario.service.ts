import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { IUsuarioi } from '../interface/IUsuario';
import { tap } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class UsuarioService {

  private url = 'http://localhost:9191/api/ControllerUsuario';

  constructor(private http: HttpClient) {}

  private getUserIdFromLocalStorage(): number | null {
    const storedUser = localStorage.getItem('user');
    if (storedUser) {
      const userData = JSON.parse(storedUser);
      return userData.loginDao.id;
    }
    return null;
  }

  listFromLocalStorage(): Observable<IUsuarioi> | null {
    const userId = this.getUserIdFromLocalStorage();
    if (userId) {
      return this.http.get<IUsuarioi>(`${this.url}/${userId}`);
    } else {
      console.error('No se encontró el ID del usuario en localStorage');
      return null;
    }
  }
}
