import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, tap } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class LoginService {

  private url = "http://localhost:9191/api/Usuario/login";
  private userKey = 'user';

  constructor(private http: HttpClient) { }

  login(nombreUsuario: string, contrasena: string): Observable<any> {
    const body = { nombreUsuario, contrasena };

    return this.http.post<any>(this.url, body)
      .pipe(
        tap(response => {
          if (response && response.success) {
            if (this.isBrowser()) {
              localStorage.setItem(this.userKey, JSON.stringify(response, null, 2));
            }
          }
        })
      );
  }

  logOut(): void {
    if (this.isBrowser()) {
      localStorage.removeItem(this.userKey);
    }
  }

  isLoggedIn(): boolean {
    if (this.isBrowser()) {
      const userData = localStorage.getItem(this.userKey);
      return userData !== null;
    }
    return false;
  }

  getUser(): any {
    if (this.isBrowser()) {
      const user = localStorage.getItem(this.userKey);
      return user ? JSON.parse(user) : null;
    }
    return null;
  }

  private isBrowser(): boolean {
    return typeof window !== 'undefined' && typeof window.localStorage !== 'undefined';
  }

}
