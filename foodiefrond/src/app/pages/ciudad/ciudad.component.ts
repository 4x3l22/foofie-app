import { Component, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import DataTables, { Config } from 'datatables.net';
import { Subject } from 'rxjs';
import { DataTablesModule } from 'angular-datatables';
import { CommonModule } from '@angular/common';
import { ICiudad } from '../../service/interface/ICiudad';
import { CiudadService } from '../../service/ciudad/ciudad.service';
import { IPais } from '../../service/interface/IPais';
import { PaisService } from '../../service/pais/pais.service';

@Component({
  selector: 'app-ciudad',
  standalone: true,
  imports: [DataTablesModule, ReactiveFormsModule, CommonModule],
  templateUrl: './ciudad.component.html',
  styleUrls: ['./ciudad.component.css']
})
export class CiudadComponent implements OnInit {
  id?: number;
  cityForm: FormGroup;
  ciudades: ICiudad[] = [];
  paises: IPais[]=[];
  dtOptions: Config = {};
  dttrigger: Subject<any> = new Subject<any>();

  constructor(
    private builder: FormBuilder,
    private router: Router,
    private service: CiudadService,
    private servicePais:  PaisService

  ){
    this.cityForm = new FormGroup({
      nombre: new FormControl(null, [Validators.required]),
      descripcion: new FormControl(null, [Validators.required]),
      paisId: new FormControl(null,  [Validators.required]),

    });
  }

  ngOnInit(): void {
    this.loadPaises();
    this.listCiudades();
    this.dtOptions = {
      pagingType: "full_numbers",
      lengthMenu: [5, 10, 15, 20]
    };
  }

  loadPaises() {
    this.servicePais.list().subscribe({
      next: (data: IPais[]) => {
        this.paises = data;
      },
      error: (error) => {
        console.error('Error al cargar los continentes', error);
      }
    });
  }

  listCiudades() {
    this.service.list().subscribe({
      next: (data: ICiudad[]) => {
        this.ciudades = data;
        this.dttrigger.next(null);
      }
    });
  }

  cargarCiudad(ciudad: ICiudad) {
    this.cityForm.patchValue({
      nombre: ciudad.nombre,
      descripcion: ciudad.descripcion,
      paisId:  ciudad.paisId

    });
    this.id = ciudad.id; // Guarda el ID de la ciudad a actualizar
  }

  registrarCiudad() {
    const nuevaCiudad: ICiudad = {
      id: this.id ? this.id : 0,
      nombre: this.cityForm.value.nombre,
      descripcion: this.cityForm.value.descripcion,
      estado: true,
      paisId: this.cityForm.value.paisId, // Agrega el valor adecuado si tienes un país relacionado
      fechaCreo: this.id ? this.ciudades.find(c => c.id === this.id)?.fechaCreo : new Date(),
      fechaModifico: this.id ? new Date() : null,
      fechaElimino: null
    };

    if (this.id) {
      this.service.update(nuevaCiudad).subscribe({
        next: (response) => {
          console.log('Ciudad actualizada exitosamente', response);
          this.listCiudades();
          this.resetForm();
        },
        error: (error) => {
          console.error('Error al actualizar la ciudad', error);
        }
      });
    } else {
      this.service.save(nuevaCiudad).subscribe({
        next: (response) => {
          console.log('Registro exitoso', response);
          this.listCiudades();
          this.resetForm();
        },
        error: (error) => {
          console.error('Error al registrar', error);
        }
      });
    }
  }

  eliminarCiudad(id: number) {
    this.service.delete(id).subscribe({
      next: () => {
        console.log('Ciudad eliminada exitosamente');
        this.listCiudades();
      },
      error: (error) => {
        console.error('Error al eliminar la ciudad', error);
      }
    });
  }

  resetForm() {
    this.cityForm.reset();
  }
}
