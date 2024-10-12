import { IComen } from './../../../service/interface/IComen';
import { Component, AfterViewInit, OnInit } from '@angular/core';
import { IPublica } from '../../../service/interface/IPublica';
import { Router } from '@angular/router';
import { ComentariosService } from '../../../service/cometarios/comentarios.service';
import { IComentarios } from '../../../service/interface/IComentarios';
import { CommonModule } from '@angular/common';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-comentariouser',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './comentariouser.component.html',
  styleUrl: './comentariouser.component.css'
})
export class ComentariouserComponent implements AfterViewInit, OnInit {

  fotoComentario?: string;
  publica: IPublica | undefined;
  comentarios: IComentarios[] = [];
  comentarioForm:  FormGroup;
  usuarioId?: string;
  recetaId?: number;
  fotoUseComentario?: string;


  constructor(
    private router: Router,
    private service: ComentariosService,
    private toastr: ToastrService
  ) {
    this.comentarioForm = new FormGroup({
      texto: new FormControl(null,  [Validators.required])
    });
  }

  ngOnInit(): void {

    if(history.state &&  history.state.recetaId){
      this.publica = history.state;
      this.loadComentarios(this.publica?.publicacionId!);
    }else{
      console.log('No hay datos de publicación disponibles.');
    }

    this.comentarioForm.get('texto')?.valueChanges.subscribe(value => {
      console.log('Nuevo valor del comentario:', value);
    });

    const usuarioData = sessionStorage.getItem('usuario');
    if(usuarioData){
      const usuario = JSON.parse(usuarioData);
      let foto = usuario.fotoPerfil;
      this.fotoComentario = this.convertirBase64AUrl(foto);
    }
  }

  ngAfterViewInit() {
    // Selecciona el textarea de la barra de comentarios flotante
    const textarea = document.querySelector('.comment-field');
    if (textarea) {
      textarea.addEventListener('input', this.autoExpand, false);
    }
  }

  loadComentarios(id: number){
    this.service.load(id).subscribe({
      next: (coment: IComentarios[]) => {
        this.comentarios = coment.map(comentario =>({
          comentarioId: comentario.comentarioId,
          texto: comentario.texto,
          nombreUsuario: comentario.nombreUsuario,
          fotoPerfil: this.convertirBase64AUrl(comentario.fotoPerfil),
          nuevocampo: this.contarCometarios(comentario.comentarioId)
        }));
        console.log(this.comentarios);
      }
    })
  }

  contarCometarios(id: number){

  }

  registrarComentario(publicacionId: number) {
    const usuario = localStorage.getItem('user');
    if (usuario) {
      const usuarioData = JSON.parse(usuario);
      this.usuarioId = usuarioData.loginDao.id;
    }
    if (this.usuarioId) {
      const data: IComen = {
        id: 0,
        texto: this.comentarioForm.get('texto')?.value,
        usuarioId: parseInt(this.usuarioId),
        publicacionesId: publicacionId,
        comentarioId: null,
        estado: true,
        fechaCreo: new Date(),
        fechaModifico: null,
        fechaElimino: null
      };

      this.service.save(data).subscribe({
        next: (response) => {
          console.log('Comentario registrado exitosamente:', response);
          this.toastr.success('Comentario Realisado', '¡Exito!')
          this.navigateTo('iniouser/comentario');
          this.comentarioForm.reset(); // Limpiar el formulario después de enviar
          this.loadComentarios(this.recetaId!); // Recargar los comentarios
        },
        error: (err) => {
          console.error('Error al registrar el comentario:', err);
        }
      });
    }
  }

  convertirBase64AUrl(base64: string): string {
    base64 = base64.trim();
    while (base64.length % 4 !== 0) {
      base64 += '=';
    }
    base64 = base64.replace(/[^A-Za-z0-9+/=]/g, '');
    return base64 ? 'data:image/jpeg;base64,' + base64 : '';
  }

  // Función para ajustar el tamaño del textarea automáticamente
  autoExpand(event: Event) {
    const element = event.target as HTMLTextAreaElement;
    element.style.height = 'auto';  // Restablece la altura
    element.style.height = `${element.scrollHeight}px`;  // Ajusta según el contenido
  }

  navigateTo(ruta: string){
    this.router.navigate([ruta]);
  }

}
