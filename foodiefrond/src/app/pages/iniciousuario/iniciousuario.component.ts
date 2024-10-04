import { Component, OnInit } from '@angular/core';
import { Router, RouterOutlet } from '@angular/router';
import { MenuusuarioComponent } from "./menuusuario/menuusuario.component";
import { UsuarioService } from '../../service/usuario/usuario.service';
import { IUsuarioi } from '../../service/interface/IUsuario';

@Component({
  selector: 'app-iniciousuario',
  standalone: true,
  imports: [RouterOutlet, MenuusuarioComponent],
  templateUrl: './iniciousuario.component.html',
  styleUrl: './iniciousuario.component.css'
})
export class IniciousuarioComponent {

}
