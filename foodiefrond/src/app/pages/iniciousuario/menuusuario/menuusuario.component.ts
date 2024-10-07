import { Component, OnInit } from '@angular/core';
import { IUsuarioi } from '../../../service/interface/IUsuario';
import { Router } from '@angular/router';
import { UsuarioService } from '../../../service/usuario/usuario.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-menuusuario',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './menuusuario.component.html',
  styleUrls: ['./menuusuario.component.css']
})
export class MenuusuarioComponent implements OnInit {

  usuario: IUsuarioi | null = null;
  fotoPerfilUrl: string | null = null;
  menuItems: any[] = [];

  constructor(private router: Router, private service: UsuarioService) {}

  ngOnInit(): void {
    this.listUsuario();
    this.cargarMenuDesdeLocalStorage();
  }

  cargarMenuDesdeLocalStorage(): void {
    const usuarioData = localStorage.getItem('user');
    if (usuarioData) {
      const parsedData = JSON.parse(usuarioData);
      this.menuItems = parsedData.menuDto || [];
      console.log("items: "+this.menuItems);
    }
  }

  // Método de navegación
  navigationTo(ruta: string) {
    this.router.navigate([ruta]);
  }

  // Listar usuario y almacenar en sessionStorage
  listUsuario() {
    const usuarioObservable = this.service.listFromLocalStorage(); // Llamamos al método del servicio

    if (usuarioObservable) {
      usuarioObservable.subscribe(
        (data: IUsuarioi) => {  // Ajustar para recibir un objeto en lugar de un array
          this.usuario = data;
          // Almacenar en sessionStorage
          this.storeUserInSession(this.usuario);

          // Si existe la foto de perfil, convertirla a URL y asignarla
          if (this.usuario.fotoPerfil) {
            this.fotoPerfilUrl = this.convertirBase64AUrl(this.usuario.fotoPerfil);
          }
        },
        (error) => {
          console.error('Error al obtener el usuario', error);
        }
      );
    } else {
      console.error('No se pudo obtener el usuario desde localStorage');
    }
  }

  // Función para convertir Base64 a Blob y obtener la URL
  convertirBase64AUrl(base64: string): string {
    // Limpiar la cadena base64
    base64 = base64.trim();

    // Asegurarse de que la longitud sea un múltiplo de 4
    while (base64.length % 4 !== 0) {
        base64 += '=';
    }

    // Reemplazar caracteres especiales que podrían estar presentes
    base64 = base64.replace(/[^A-Za-z0-9+/=]/g, '');

    // Si la cadena es válida, construir la URL
    if (base64) {
        // console.log("debug:  "+'data:image/png;base64,'+base64);

        return 'data:image/jpeg;base64,' + base64;
    } else {
        console.error('La cadena base64 está vacía o es inválida');
        return ''; // O algún valor predeterminado
    }
  }

  // Almacena el usuario en sessionStorage
  storeUserInSession(usuario: IUsuarioi) {
    const usuarioParaGuardar = {
      nombreUsuario: usuario.nombreUsuario,
      correo: usuario.correo,
      fotoPerfil: usuario.fotoPerfil
    };
    sessionStorage.setItem('usuario', JSON.stringify(usuarioParaGuardar));
  }

  salir(){
    sessionStorage.removeItem('usuario');
    localStorage.removeItem('user');
  }
}
