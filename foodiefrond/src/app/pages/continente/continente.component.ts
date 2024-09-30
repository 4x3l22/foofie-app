import { IContinente } from './../../service/interface/IContinente';
import { Component, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import DataTables, { Config } from 'datatables.net';
import { Subject } from 'rxjs';
import { ContinenteService } from '../../service/continente/continente.service';
import { DataTablesModule } from 'angular-datatables';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-continente',
  standalone: true,
  imports: [DataTablesModule, CommonModule, ReactiveFormsModule],
  templateUrl: './continente.component.html',
  styleUrls: ['./continente.component.css']
})
export class ContinenteComponent implements OnInit {
  id?: number;
  continenteForm: FormGroup;
  continentes: IContinente[] = [];
  dtOptions: Config = {};
  dttrigger: Subject<any> = new Subject<any>();

  constructor(
    private builder: FormBuilder,
    private router: Router,
    private service: ContinenteService
  ) {
    this.continenteForm = new FormGroup({
      nombre: new FormControl(null, [Validators.required]),
      descripcion: new FormControl(null, [Validators.required])
    });
  }

  ngOnInit(): void {
    this.listContinentes();
    this.dtOptions = {
      pagingType: "full_numbers",
      lengthMenu: [5, 10, 15, 20]
    };
  }

  listContinentes() {
    this.service.list().subscribe({
      next: (data: IContinente[]) => {
        this.continentes = data;
        this.dttrigger.next(null);
      }
    });
  }

  cargarContinente(continente: IContinente) {
    this.continenteForm.patchValue({
      nombre: continente.nombre,
      descripcion: continente.descripcion
    });
    this.id = continente.id; // Guarda el ID del continente a actualizar
  }

  registrarContinente() {
    const nuevoContinente: IContinente = {
      id: this.id ? this.id : 0,
      nombre: this.continenteForm.value.nombre,
      descripcion: this.continenteForm.value.descripcion,
      estado: true,
      fechaCreo: this.id ? this.continentes.find(cont => cont.id === this.id)?.fechaCreo : new Date(),
      fechaModifico: this.id ? new Date() : null,
      fechaElimino: null
    };

    if (this.id) {
      this.service.update(nuevoContinente).subscribe({
        next: (response) => {
          console.log('Continente actualizado exitosamente', response);
          this.listContinentes();
          this.resetForm();
        },
        error: (error) => {
          console.error('Error al actualizar el continente', error);
        }
      });
    } else {
      this.service.save(nuevoContinente).subscribe({
        next: (response) => {
          console.log('Registro exitoso', response);
          this.listContinentes();
          this.resetForm();
        },
        error: (error) => {
          console.error('Error al registrar', error);
        }
      });
    }
  }

  eliminarContinente(id: number) {
    this.service.delete(id).subscribe({
      next: () => {
        console.log('Continente eliminado exitosamente');
        this.listContinentes();
      },
      error: (error) => {
        console.error('Error al eliminar el continente', error);
      }
    });
  }

  resetForm() {
    this.continenteForm.reset();
  }
}
