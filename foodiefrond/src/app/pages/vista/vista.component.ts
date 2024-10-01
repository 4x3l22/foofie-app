import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { IVista } from '../../service/interface/IVista';
import { VistaService } from '../../service/vista/vista.service';
import { IModulo } from '../../service/interface/IModulo';
import { ModuloService } from '../../service/modulo/modulo.service';
import { Subject } from 'rxjs';
import { Config } from 'datatables.net';
import { DataTablesModule } from 'angular-datatables';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-vista',
  standalone: true,
  imports: [DataTablesModule, CommonModule, ReactiveFormsModule],
  templateUrl: './vista.component.html',
  styleUrls: ['./vista.component.css']
})
export class VistaComponent implements OnInit {
  id?: number;
  vistaForm: FormGroup;
  vistas: IVista[] = [];
  modulos: IModulo[] = [];
  dtOptions: Config = {};
  dtTrigger: Subject<any> = new Subject<any>();

  constructor(
    private builder: FormBuilder,
    private router: Router,
    private vistaService: VistaService,
    private moduloService: ModuloService
  ) {
    this.vistaForm = new FormGroup({
      nombre: new FormControl(null, [Validators.required]),
      estado: new FormControl(true, [Validators.required]),
      items: new FormControl(null, [Validators.required]),
      moduloId: new FormControl(null, [Validators.required])
    });
  }

  ngOnInit(): void {
    this.loadModulos();
    this.listVistas();
    this.dtOptions = {
      pagingType: 'full_numbers',
      pageLength: 10
    };
  }

  loadModulos() {
    this.moduloService.list().subscribe({
      next: (data: IModulo[]) => {
        this.modulos = data;
      },
      error: (error) => {
        console.error('Error al cargar los módulos', error);
      }
    });
  }

  listVistas() {
    this.vistaService.list().subscribe({
      next: (data: IVista[]) => {
        this.vistas = data;
        this.dtTrigger.next(null);
      },
      error: (error) => {
        console.error('Error al listar las vistas', error);
      }
    });
  }

  registrarVista() {
    const nuevaVista: IVista = {
      id: this.id ? this.id : 0,
      nombre: this.vistaForm.value.nombre,
      estado: this.vistaForm.value.estado,
      items: this.vistaForm.value.items,
      moduloId: this.vistaForm.value.moduloId,
      fechaCreo: this.id ? this.vistas.find(v => v.id === this.id)?.fechaCreo : new Date(),
      fechaModifico: this.id ? new Date() : null,
      fechaElimino: null
    };

    if (this.id) {
      this.vistaService.update(nuevaVista).subscribe({
        next: (response) => {
          console.log('Vista actualizada exitosamente', response);
          this.listVistas();
          this.resetForm();
        },
        error: (error) => {
          console.error('Error al actualizar la vista', error);
        }
      });
    } else {
      this.vistaService.save(nuevaVista).subscribe({
        next: (response) => {
          console.log('Vista registrada exitosamente', response);
          this.listVistas();
          this.resetForm();
        },
        error: (error) => {
          console.error('Error al registrar la vista', error);
        }
      });
    }
  }

  eliminarVista(id: number) {
    this.vistaService.delete(id).subscribe({
      next: () => {
        console.log('Vista eliminada exitosamente');
        this.listVistas();
      },
      error: (error) => {
        console.error('Error al eliminar la vista', error);
      }
    });
  }

  cargarVista(vista: IVista) {
    this.vistaForm.patchValue({
      nombre: vista.nombre,
      estado: vista.estado,
      items: vista.items,
      moduloId: vista.moduloId
    });
    this.id = vista.id;
  }

  resetForm() {
    this.vistaForm.reset();
  }
}
