import { config } from './../../app.config.server';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Subject } from 'rxjs';
import { DataTablesModule } from 'angular-datatables';
import { CommonModule } from '@angular/common';
import { ITipoCocina } from '../../service/interface/ITipoCocina';
import { TipococinaService } from '../../service/tipococina/tipococina.service';
import { Config } from 'datatables.net';

@Component({
  selector: 'app-tipococina',
  standalone: true,
  imports: [DataTablesModule, CommonModule, ReactiveFormsModule],
  templateUrl: './tiposcocina.component.html',
  styleUrls: ['./tiposcocina.component.css']
})
export class TipoCocinaComponent implements OnInit {
  id?: number;
  tipoCocinaForm: FormGroup;
  tiposCocina: ITipoCocina[] = [];
  dtOptions: Config = {};
  dttrigger: Subject<any> = new Subject<any>();

  constructor(
    private builder: FormBuilder,
    private router: Router,
    private service: TipococinaService
  ) {
    this.tipoCocinaForm = new FormGroup({
      nombre: new FormControl(null, [Validators.required]),
      descripcion: new FormControl(null, [Validators.required]),
      estado: new FormControl(true, [Validators.required])
    });
  }

  ngOnInit(): void {
    this.listTipoCocina();
    this.dtOptions = {
      pagingType: "full_numbers",
      lengthMenu: [5, 10, 15, 20]
    };
  }

  listTipoCocina() {
    this.service.list().subscribe({
      next: (data: ITipoCocina[]) => {
        this.tiposCocina = data;
        this.dttrigger.next(null);
      },
      error: (error) => {
        console.error('Error al listar los tipos de cocina', error);
      }
    });
  }

  cargarTipoCocina(tipoCocina: ITipoCocina) {
    this.tipoCocinaForm.patchValue({
      nombre: tipoCocina.nombre,
      descripcion: tipoCocina.descripcion,
      estado: tipoCocina.estado
    });
    this.id = tipoCocina.id; // Guarda el ID del tipo de cocina a actualizar
  }

  registrarTipoCocina() {
    const nuevoTipoCocina: ITipoCocina = {
      id: this.id ? this.id : 0,
      nombre: this.tipoCocinaForm.value.nombre,
      descripcion: this.tipoCocinaForm.value.descripcion,
      estado: this.tipoCocinaForm.value.estado,
      fechaCreo: this.id ? this.tiposCocina.find(tc => tc.id === this.id)?.fechaCreo : new Date(),
      fechaModifico: this.id ? new Date() : null,
      fechaElimino: null
    };

    if (this.id) {
      this.service.update(nuevoTipoCocina).subscribe({
        next: (response) => {
          console.log('Tipo de cocina actualizado exitosamente', response);
          this.listTipoCocina();
          this.resetForm();
        },
        error: (error) => {
          console.error('Error al actualizar el tipo de cocina', error);
        }
      });
    } else {
      this.service.save(nuevoTipoCocina).subscribe({
        next: (response) => {
          console.log('Registro exitoso', response);
          this.listTipoCocina();
          this.resetForm();
        },
        error: (error) => {
          console.error('Error al registrar el tipo de cocina', error);
        }
      });
    }
  }

  eliminarTipoCocina(id: number) {
    this.service.delete(id).subscribe({
      next: () => {
        console.log('Tipo de cocina eliminado exitosamente');
        this.listTipoCocina();
      },
      error: (error) => {
        console.error('Error al eliminar el tipo de cocina', error);
      }
    });
  }

  resetForm() {
    this.tipoCocinaForm.reset();
    this.tipoCocinaForm.patchValue({ estado: true }); // Restablecer el estado a true
  }
}
