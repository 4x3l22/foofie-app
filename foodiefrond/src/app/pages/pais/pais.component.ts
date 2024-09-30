import { IPais } from './../../service/interface/IPais';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import DataTables, { Config } from 'datatables.net';
import { Subject } from 'rxjs';
import { PaisService } from '../../service/pais/pais.service';
import { DataTablesModule } from 'angular-datatables';
import { CommonModule } from '@angular/common';
import { IContinente } from '../../service/interface/IContinente';
import { ContinenteService } from '../../service/continente/continente.service';

@Component({
  selector: 'app-pais',
  standalone: true,
  imports: [DataTablesModule, CommonModule, ReactiveFormsModule],
  templateUrl: './pais.component.html',
  styleUrls: ['./pais.component.css']
})
export class PaisComponent implements OnInit {
  id?: number;
  paisForm: FormGroup;
  paises: IPais[] = [];
  continentes: IContinente[] = [];
  dtOptions: Config = {};
  dttrigger: Subject<any> = new Subject<any>();

  constructor(
    private builder: FormBuilder,
    private router: Router,
    private service: PaisService,
    private continenteService: ContinenteService
  ) {
    this.paisForm = new FormGroup({
      nombre: new FormControl(null, [Validators.required]),
      descripcion: new FormControl(null, [Validators.required]),
      continenteId: new FormControl(null, [Validators.required])
    });
  }

  ngOnInit(): void {
    this.loadContinentes();
    this.listPaises();
    this.dtOptions = {
      pagingType: "full_numbers",
      lengthMenu: [5, 10, 15, 20]
    };
  }

  listPaises() {
    this.service.list().subscribe({
      next: (data: IPais[]) => {
        this.paises = data;
        this.dttrigger.next(null);
      }
    });
  }

  loadContinentes() {
    this.continenteService.list().subscribe({
      next: (data: IContinente[]) => {
        this.continentes = data;
      },
      error: (error) => {
        console.error('Error al cargar los continentes', error);
      }
    });
  }

  cargarPais(pais: IPais) {
    this.paisForm.patchValue({
      nombre: pais.nombre,
      descripcion: pais.descripcion,
      continenteId: pais.continenteId
    });
    this.id = pais.id; // Guarda el ID del país a actualizar
  }

  registrarPais() {
    const nuevoPais: IPais = {
      id: this.id ? this.id : 0,
      nombre: this.paisForm.value.nombre,
      descripcion: this.paisForm.value.descripcion,
      estado: true,
      continenteId: this.paisForm.value.continenteId,
      fechaCreo: this.id ? this.paises.find(p => p.id === this.id)?.fechaCreo : new Date(),
      fechaModifico: this.id ? new Date() : null,
      fechaElimino: null
    };

    if (this.id) {
      this.service.update(nuevoPais).subscribe({
        next: (response) => {
          console.log('País actualizado exitosamente', response);
          this.listPaises();
          this.resetForm();
        },
        error: (error) => {
          console.error('Error al actualizar el país', error);
        }
      });
    } else {
      this.service.save(nuevoPais).subscribe({
        next: (response) => {
          console.log('Registro exitoso', response);
          this.listPaises();
          this.resetForm();
        },
        error: (error) => {
          console.error('Error al registrar', error);
        }
      });
    }
  }

  eliminarPais(id: number) {
    this.service.delete(id).subscribe({
      next: () => {
        console.log('País eliminado exitosamente');
        this.listPaises();
      },
      error: (error) => {
        console.error('Error al eliminar el país', error);
      }
    });
  }

  resetForm() {
    this.paisForm.reset();
  }
}
