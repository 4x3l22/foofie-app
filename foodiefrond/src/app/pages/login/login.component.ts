import { Component } from '@angular/core';
import { LoginService } from '../../service/login/login.service';
import { Router } from '@angular/router';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [ReactiveFormsModule, FormsModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent {

  nombreUsuario =  '';
  contrasena = '';
  mensajeError = '';

  constructor(private authService: LoginService, private router:  Router) { }

  login(): void {
    this.authService.login(this.nombreUsuario, this.contrasena).subscribe(
      (response) => {
        if (response.success) {
          const user = response; // Guarda el objeto completo que has recibido
          localStorage.setItem('user', JSON.stringify(user)); // Guarda en localStorage

          const rolId = user.loginDao.rolId; // Accede a rolId desde loginDao

          // Redirigir según el rol del usuario
          if (rolId === 1) {
            this.router.navigate(['star']); // Admin
          } else if (rolId === 2) {
            this.router.navigate(['iniouser']); // Usuario
          }
        } else {
          this.mensajeError = 'Credenciales erróneas';
        }
      },
      (error: any) => {
        this.mensajeError = 'Error del servidor';
      }
    );
  }

  navigateto(ruta: string) {
    this.router.navigate([ruta]);
  }
}
