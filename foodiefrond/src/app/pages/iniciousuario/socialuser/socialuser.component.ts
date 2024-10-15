import { Component, OnInit } from '@angular/core';
import { PublicacionService } from '../../../service/publicacion/publicacion.service';
import { IPublica } from '../../../service/interface/IPublica';
import { CommonModule } from '@angular/common';
import {Router} from "@angular/router";

@Component({
  selector: 'app-socialuser',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './socialuser.component.html',
  styleUrl: './socialuser.component.css'
})
export class SocialuserComponent implements OnInit{

  publica: IPublica[]=[];
  fotoperfil?: string;
  fotoUrl?: string | null = null;
  nombreUsuario?: string;

  constructor(
    private service: PublicacionService,
    private router: Router
  ){}

  ngOnInit(): void {
    this.datospublicacion();
    this.loadDatos();
  }

  loadDatos(){
    this.service.loadpublic().subscribe({
      next: (publicacion: IPublica[]) => {
        this.publica = publicacion.map(publicaciones => ({
          publicacionId: publicaciones.publicacionId,
          titulo: publicaciones.titulo,
          fotoPerfil: publicaciones.fotoPerfil ? this.convertirBase64AUrl(publicaciones.fotoPerfil): '',
          foto: publicaciones.foto ? this.convertirBase64AUrl(publicaciones.foto) : '',
          descripcion: publicaciones.descripcion,
          nombreUsuario: publicaciones.nombreUsuario,
          recetaId: publicaciones.recetaId,
          usuarioId: publicaciones.usuarioId
        }));

        console.log("Aquí estoy", this.publica);
      },
      error: (err) => {
        console.error('Error al cargar las publicaciones', err);
      }
    });
  }

  navigateTo(publica: IPublica){
    this.router.navigate(['iniouser/comentario'], {
      state:{
        publicacionId:  publica.publicacionId,
        titulo: publica.titulo,
        fotoPerfil: publica.fotoPerfil,
        nombreUsuario: publica.nombreUsuario,
        foto: publica.foto,
        descripcion: publica.descripcion,
        recetaId: publica.recetaId,
        usuarioId: publica.usuarioId
      }
    });
  }

  datospublicacion() {
    const usuarioString = sessionStorage.getItem('usuario');
    if (usuarioString) {
      const usuario = JSON.parse(usuarioString);
      this.nombreUsuario =  usuario.nombreUsuario;

      this.fotoperfil = usuario.fotoPerfil;
      if(this.fotoperfil){
        this.fotoUrl = this.convertirBase64AUrl(this.fotoperfil);
      }
    } else {
      console.error('No se encontró el usuario en sessionStorage');
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

  share(publica: IPublica) {
    if (navigator.share) {
      navigator.share({
        title: publica.titulo,
        text: publica.descripcion,
        url: window.location.href // Puedes cambiar esta URL si tienes una URL específica para compartir
      }).then(() => {
        console.log('Contenido compartido con éxito.');
      }).catch((error) => {
        console.error('Error al compartir:', error);
      });
    } else {
      console.log('La API de compartir no es compatible con este navegador.');
      // Aquí puedes manejar un método alternativo de compartir
    }
  }


}
