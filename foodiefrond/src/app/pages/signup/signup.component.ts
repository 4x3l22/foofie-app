import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { SignupService } from '../../service/signup/signup.service';
import { IPersona } from '../../service/interface/IPersona';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { DataTablesModule } from 'angular-datatables';
import { CommonModule } from '@angular/common';
import { ITipoDocumento } from '../../service/interface/ITipoDocumento';
import { TipodocumentoService } from '../../service/tipodocumento/tipodocumento.service';
import { ICiudad } from '../../service/interface/ICiudad';
import { CiudadService } from '../../service/ciudad/ciudad.service';
import { IUsuarioi } from '../../service/interface/IUsuario';
import { UsuariorolService } from '../../service/usuariorol/usuariorol.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-signup',
  standalone: true,
  imports: [DataTablesModule, CommonModule, ReactiveFormsModule],
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})
export class SignupComponent implements OnInit {
  id?: number;
  persona: IPersona[] = [];
  documentoTip: ITipoDocumento[] = [];
  ciudad: ICiudad[] = [];
  personaForm: FormGroup;
  usuarioForm: FormGroup;
  isPersonaForm: boolean = true; // Bandera para alternar entre formularios
  personaId: number | null = null;
  fotoPerfilBase64?: string;

  constructor(
    private router: Router,
    private service: SignupService,
    private serviceTipDocumento: TipodocumentoService,
    private serviceCiudad: CiudadService,
    private serviceUsuarioRol: UsuariorolService
  ) {
    this.personaForm = new FormGroup({
      primerNombre: new FormControl(null, Validators.required),
      segundoNombre: new FormControl(null, Validators.required),
      primerApellido: new FormControl(null, Validators.required),
      segundoApellido: new FormControl(null, Validators.required),
      genero: new FormControl(null, Validators.required),
      documentoId: new FormControl(null, Validators.required),
      numeroDocumento: new FormControl(null, Validators.required),
      cumpleanios: new FormControl(null, Validators.required),
      ciudadId: new FormControl(null, Validators.required),
    });

    this.usuarioForm = new FormGroup({
      nombreUsuario: new FormControl(null, Validators.required),
      correo: new FormControl(null, [Validators.required, Validators.email]),
      contrasena: new FormControl(null, Validators.required),
      fotoPerfil: new FormControl(null),
      planesId: new FormControl(null, Validators.required)
    });
  }

  ngOnInit(): void {
    this.cargarTipDocumentos();
    this.cargarCiudad();
  }

  registrarPersona() {
    if (this.isPersonaForm) {
      const generoSeleccionado = this.personaForm.get('genero')?.value;
      const generoReducido = generoSeleccionado === 'masculino' ? 'M' : generoSeleccionado === 'femenino' ? 'F' : 'O';

      const cumpleaniosSeleccionado = this.personaForm.get('cumpleanios')?.value;
      const cumpleaniosISO = new Date(cumpleaniosSeleccionado).toISOString();

      const data = {
        id: this.id ? this.id : 0,
        primerNombre: this.personaForm.get('primerNombre')?.value,
        segundoNombre: this.personaForm.get('segundoNombre')?.value,
        primerApellido: this.personaForm.get('primerApellido')?.value,
        segundoApellido: this.personaForm.get('segundoApellido')?.value,
        genero: generoReducido,
        documentoId: this.personaForm.get('documentoId')?.value,
        numeroDocumento: this.personaForm.get('numeroDocumento')?.value,
        cumpleanios: cumpleaniosISO,
        estado: true,
        ciudadId: this.personaForm.get('ciudadId')?.value,
        fechaCreo: new Date(),
        fechaModifico: null,
        fechaElimino: null
      }

      this.service.save(data).subscribe({
        next: (responde) => {
          console.log("Registro de persona exitoso", responde);
          this.personaId = responde.id;
          console.log('Persona registrada con ID:', this.personaId);
          this.segundoPaso();
        }
      })
    }
  }

  registroUsuario() {
    const usuarioData = {
      id: 0,
      nombreUsuario: this.usuarioForm.get('nombreUsuario')?.value,
      correo: this.usuarioForm.get('correo')?.value,
      contrasena: this.usuarioForm.get('contrasena')?.value,
      fotoPerfil: this.fotoPerfilBase64,
      personaId: this.personaId!,
      planesId: 1,
      fechaCreo: new Date(),
      fechaModifico: null,
      fechaElimino: null
    };
    console.log(usuarioData);
    this.service.saveUser(usuarioData).subscribe({
      next: (responde) => {
        console.log("Registro de usuario exitoso", responde);
        this.registroRol(responde.id);
      }
    });
  }

  navigatorTo() {
    this.router.navigate(['login']);
  }

  cargarTipDocumentos() {
    this.serviceTipDocumento.list().subscribe({
      next: (data: ITipoDocumento[]) => {
        this.documentoTip = data;
      }
    });
  }

  cargarCiudad() {
    this.serviceCiudad.list().subscribe({
      next: (data: ICiudad[]) => {
        this.ciudad = data;
      }
    });
  }

  registrar() {
    if (this.isPersonaForm) {
      this.registrarPersona();
    } else {
      this.registroUsuario();
    }
  }

  segundoPaso() {
    this.isPersonaForm = false;
  }

  onFileChange(event: Event) {
    const input = event.target as HTMLInputElement;
    if (input.files && input.files.length > 0) {
      const file = input.files[0];
      const reader = new FileReader();

      reader.readAsDataURL(file);
      reader.onload = () => {
        this.fotoPerfilBase64 = reader.result as string;
      };
    }
  }

  registroRol(id: number) {
    const data = {
      id: 0,
      usuarioId: id,
      rolId: 2,
      estado: true,
      fechaCreo: new Date(),
      fechaModifico: null,
      fechaElimino: null
    };
    this.serviceUsuarioRol.save(data).subscribe(
      (response: any) => {
        Swal.fire({
          icon: 'success',
          title: '¡Registro Exitoso!',
          text: 'Se registró su cuenta satisfactoriamente',
          confirmButtonText: 'Aceptar',
        }).then((result) => {
          if (result.isConfirmed) {
            this.navigatorTo(); // Redirigir al login
          }
        });
      },
      error => {
        Swal.fire({
          icon: 'error',
          title: 'Error',
          text: 'Hubo un problema al registrar el rol del usuario',
          confirmButtonText: 'Aceptar',
        });
      }
    );
  }
}
