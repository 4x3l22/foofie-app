import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { IUsuarioi } from '../interface/IUsuario';
import { tap } from 'rxjs/operators';
import { IPublica } from '../interface/IPublica';

@Injectable({
  providedIn: 'root'
})
export class UsuarioService {

  private url = 'http://localhost:9191/api/Usuario';
  private urlPubli = 'http://localhost:9191/api/Publicaciones';

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

  listarPublicacionesUsuario(id: number): Observable<IPublica[]>{
    const headers = new HttpHeaders({  'Content-Type': 'application/json' });
    return this.http.get<IPublica[]>(`${this.urlPubli}/publicUser/${id}`, {headers: headers});
  }

  updateUser(id: number,  user: IUsuarioi): Observable<IUsuarioi> {
    const headers =  new HttpHeaders({  'Content-Type': 'application/json' });
    return this.http.put<IUsuarioi>(`${this.url}/${id}`, user,  { headers });
  }

}
