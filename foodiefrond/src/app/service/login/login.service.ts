import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, tap } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class LoginService {

  private url = "http://localhost:9191/api/ControllerUsuario/login"
  private userKey = 'user';

  constructor(private http:  HttpClient) { }

  login(nombreUsuario: string, contrasena: string): Observable<any>{

    const body = {nombreUsuario, contrasena};

    return this.http.post<any>(this.url, body)
    .pipe(
      tap(response=>{
        if(response && response.success){
          localStorage.setItem('user',  JSON.stringify(response, null, 2));
        }
      })
    )

  }

  logOut(): void{
    localStorage.removeItem('user');
  }

  isLoggedIn(): boolean{

    const userData = localStorage.getItem('user');
    return userData !== null;

  }

  getUser(): any {
    const user = localStorage.getItem(this.userKey);
    return user ? JSON.parse(user) : null;
  }

}
