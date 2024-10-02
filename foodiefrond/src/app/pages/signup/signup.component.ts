import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { SignupService } from '../../service/signup/signup.service';
import { IPersona } from '../../service/interface/IPersona';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { DataTablesModule } from 'angular-datatables';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-signup',
  standalone: true,
  imports: [DataTablesModule, CommonModule, ReactiveFormsModule],
  templateUrl: './signup.component.html',
  styleUrl: './signup.component.css'
})
export class SignupComponent {

  id?: number;
  persona: IPersona[] = [];
  personaForm: FormGroup;

  constructor
  (
    private router: Router,
    private service: SignupService
  )
  {
    this.personaForm = new FormGroup({
      primerNombre:  new FormControl(null,  Validators.required),
      segundoNombre: new FormControl(null, Validators.required),
      primerApellido: new  FormControl(null, Validators.required),
      segundoApellido: new FormControl(null, Validators.required),
      genero : new FormControl(null, Validators.required),
      documentoId:  new FormControl(null, Validators.required),
      numeroDocumento:  new FormControl(null, Validators.required),
      cumpleanios:  new FormControl(null, Validators.required),
      ciudadId:   new FormControl(null, Validators.required),

    });
  }

  registrarPersona(){
    const data = {
      primerNombre: this.personaForm.get('primerNombre')?.value,
      segundoNombre: this.personaForm.get('segundoNombre')?.value,
      primerApellido: this.personaForm.get('primerApellido')?.value,
      segundoApellido: this.personaForm.get('segundoApellido')?.value,
      genero: this.personaForm.get('genero')?.value,
      documentoId: this.personaForm.get('documentoId')?.value,
      numeroDocumento: this.personaForm.get('numeroDocumento')?.value,
      cumpleanios: this.personaForm.get('cumpleanios')?.value,
      ciudadId: this.personaForm.get('ciudadId')?.value
    }
  }

  completarPaso(){

  }
}
