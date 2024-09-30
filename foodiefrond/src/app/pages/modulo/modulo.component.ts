import { IModulo } from './../../service/interface/IModulo';
import { Component, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import DataTables, { Config } from 'datatables.net';
import { Subject } from 'rxjs';
import { ModuloService } from '../../service/modulo/modulo.service';
import { DataTablesModule } from 'angular-datatables';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-modulo',
  standalone: true,
  imports: [DataTablesModule, ReactiveFormsModule, CommonModule],
  templateUrl: './modulo.component.html',
  styleUrls: ['./modulo.component.css']
})
export class ModuloComponent implements OnInit {
  id?: number;
  moduleForm: FormGroup;
  modulos: IModulo[] = [];
  dtOptions: Config = {};
  dttrigger: Subject<any> = new Subject<any>();

  constructor(
    private builder: FormBuilder,
    private router: Router,
    private service: ModuloService
  ) {
    this.moduleForm = new FormGroup({
      nombre: new FormControl(null, [Validators.required]),
      description: new FormControl(null, [Validators.required])
    });
  }

  ngOnInit(): void {
    this.listModulos();
    this.dtOptions = {
      pagingType: "full_numbers",
      lengthMenu: [5, 10, 15, 20]
    };
  }

  listModulos() {
    this.service.list().subscribe({
      next: (data: IModulo[]) => {
        this.modulos = data;
        this.dttrigger.next(null);
      }
    });
  }

  cargarModulo(modulo: IModulo) {
    this.moduleForm.patchValue({
      nombre: modulo.nombre,
      description: modulo.descripcion
    });
    this.id = modulo.id; // Guarda el ID del módulo a actualizar
  }

  registrarModulo() {
    const nuevoModulo: IModulo = {
      id: this.id ? this.id : 0,
      nombre: this.moduleForm.value.nombre,
      descripcion: this.moduleForm.value.description,
      estado: true,
      fechaCreo: this.id ? this.modulos.find(mod => mod.id === this.id)?.fechaCreo : new Date(),
      fechaModifico: this.id ? new Date() : null,
      fechaElimino: null
    };

    if (this.id) {
      this.service.update(nuevoModulo).subscribe({
        next: (response) => {
          console.log('Módulo actualizado exitosamente', response);
          this.listModulos();
          this.resetForm();
        },
        error: (error) => {
          console.error('Error al actualizar el módulo', error);
        }
      });
    } else {
      this.service.save(nuevoModulo).subscribe({
        next: (response) => {
          console.log('Registro exitoso', response);
          this.listModulos();
          this.resetForm();
        },
        error: (error) => {
          console.error('Error al registrar', error);
        }
      });
    }
  }

  eliminarModulo(id: number) {
    this.service.delete(id).subscribe({
      next: () => {
        console.log('Módulo eliminado exitosamente');
        this.listModulos();
      },
      error: (error) => {
        console.error('Error al eliminar el módulo', error);
      }
    });
  }

  resetForm() {
    this.moduleForm.reset();
  }
}
