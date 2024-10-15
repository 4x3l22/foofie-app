import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { UsuarioService } from '../../../service/usuario/usuario.service';
import { IUsuarioi } from '../../../service/interface/IUsuario';
import { IPublica } from '../../../service/interface/IPublica';

interface Course {
  name: string;
  description: string;
  lessons: number;
  status: 'Completed' | 'In Progress';
}

@Component({
  selector: 'app-perfilusuario',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './perfilusuario.component.html',
  styleUrl: './perfilusuario.component.css'
})
export class PerfilusuarioComponent implements OnInit{

  nombreUsuario?: string;
  nombre?: string | undefined;
  correo?: string;
  imagenPerfil?: string;
  publicacion: IPublica[] = [];

  constructor(
    private router: Router,
    private service:  UsuarioService
  ){}

  ngOnInit(): void {
    this.datosUsuario();
    this.loadPubli();
  }

  datosUsuario(){
    const user = sessionStorage.getItem('usuario');
    if (user) {
      const userObject = JSON.parse(user);
      this.nombreUsuario = userObject.nombreUsuario;
      this.correo =  userObject.correo;
      this.imagenPerfil = this.convertirBase64AUrl(userObject.fotoPerfil);
      this.nombre = this.nombreUsuario?.toUpperCase();
    }
  }

  convertirBase64AUrl(base64: string): string {
    // Limpiar la cadena base64
    base64 = base64.trim();

    // Verificar y eliminar el prefijo 'data:image/jpeg;base64,' o cualquier prefijo 'data:image/...'
    const prefix = /^data:image\/[a-zA-Z]+;base64,/;
    base64 = base64.replace(prefix, '');

    // Asegurarse de que la longitud sea un múltiplo de 4
    while (base64.length % 4 !== 0) {
        base64 += '=';
    }

    // Reemplazar caracteres especiales que podrían estar presentes
    base64 = base64.replace(/[^A-Za-z0-9+/=]/g, '');

    // Si la cadena es válida, construir la URL
    if (base64) {
        return 'data:image/jpeg;base64,' + base64;
    } else {
        console.error('La cadena base64 está vacía o es inválida');
        return ''; // O algún valor predeterminado
    }
  }

  cambiarFoto(){

    let usuario = localStorage.getItem('user');
    if(usuario){
      let user = JSON.parse(usuario);
      let userid = user.loginDao.id;

      // const data: IUsuarioi = {
      //   id: userid,
      //   nombreUsuario: null;
      //   correo: string;
      //   contrasena: string;
      //   fotoPerfil: string | undefined;
      //   personaId: number;
      //   planesId: number;
      //   fechaCreo: Date;
      //   fechaModifico: Date | null;
      //   fechaElimino: Date | null;
      // }

      this.service.updateUser
    }
  }

  loadPubli(){
    const userlocal = localStorage.getItem('user');
    if(userlocal){
      const userll = JSON.parse(userlocal);
      let usuaruiId = userll.loginDao.id;
      this.service.listarPublicacionesUsuario(usuaruiId).subscribe({
        next: (data: IPublica[]) => {
          this.publicacion = data;
          // this.publicacion = data.map(publicaciones =>({
          //   publicacionId: publicaciones.publicacionId,
          //   titulo: publicaciones.titulo,
          //   descripcion: publicaciones.descripcion,
          //   foto: publicaciones.foto,
          //   usuarioId: publicaciones.usuarioId,
          //   recetaId: publicaciones.recetaId,
          //   nombreUsuario: publicaciones.nombreUsuario,
          //   fotoPerfil: this.convertirBase64AUrl(publicaciones.fotoPerfil)
          // }));
        }

      })
    }
  }
}
