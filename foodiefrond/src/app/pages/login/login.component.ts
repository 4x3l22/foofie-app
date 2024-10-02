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
    // alert('Usuario: '+this.nombreUsuario+'\nContraseña: '+ this.contrasena);

    this.authService.login(this.nombreUsuario, this.contrasena).subscribe(
      (response) => {
        if (response.success) {
          this.router.navigate(['star']);
        } else {
          this.mensajeError = 'Credenciales erróneas';
        }
      },
      (error: any) => {
        this.mensajeError = 'Error del servidor';
      }
    );
  }

  navigateto(ruta: string){
    this.router.navigate([ruta]);
  }
}
