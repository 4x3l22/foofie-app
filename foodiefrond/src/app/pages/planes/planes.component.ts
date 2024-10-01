import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Subject } from 'rxjs';
import { IMediosPago } from '../../service/interface/IMediosPago'; // Importar la interfaz de Medios de Pago
import DataTables, { Config } from 'datatables.net';
import { DataTablesModule } from 'angular-datatables';
import { CommonModule } from '@angular/common';
import { IPlanes } from '../../service/interface/IPlanes';
import { PlanesService } from '../../service/planes/planes.service';
import { MediospagoService } from '../../service/mediospago/mediospago.service';

@Component({
  selector: 'app-planes',
  standalone: true,
  imports: [DataTablesModule, CommonModule, ReactiveFormsModule],
  templateUrl: './planes.component.html',
  styleUrls: ['./planes.component.css']
})
export class PlanesComponent implements OnInit {
  id?: number;
  planForm: FormGroup;
  planes: IPlanes[] = [];
  mediosPago: IMediosPago[] = [];  // Variable para almacenar los medios de pago
  dtOptions: Config = {};
  dttrigger: Subject<any> = new Subject<any>();

  constructor(
    private builder: FormBuilder,
    private router: Router,
    private service: PlanesService,
    private mediosPagoService: MediospagoService  // Inyectar el servicio de medios de pago
  ) {
    this.planForm = new FormGroup({
      nombre: new FormControl(null, [Validators.required]),
      descripcion: new FormControl(null, [Validators.required]),
      precio: new FormControl(null, [Validators.required]),
      mediospagoId: new FormControl(null, [Validators.required])  // Campo para medios de pago
    });
  }

  ngOnInit(): void {
    this.loadMediosPago();  // Cargar los medios de pago al iniciar
    this.listPlanes();
    this.dtOptions = {
      pagingType: 'full_numbers',
      lengthMenu: [5, 10, 15, 20]
    };
  }

  listPlanes() {
    this.service.list().subscribe({
      next: (data: IPlanes[]) => {
        this.planes = data;
        this.dttrigger.next(null);
      }
    });
  }

  loadMediosPago() {
    this.mediosPagoService.list().subscribe({
      next: (data: IMediosPago[]) => {
        this.mediosPago = data;  // Asignar los medios de pago a la variable
      },
      error: (error) => {
        console.error('Error al cargar los medios de pago', error);
      }
    });
  }

  cargarPlan(plan: IPlanes) {
    this.planForm.patchValue({
      nombre: plan.nombre,
      descripcion: plan.descripcion,
      precio: plan.precio,
      mediospagoId: plan.mediospagoId
    });
    this.id = plan.id;  // Guarda el ID del plan a actualizar
  }

  registrarPlan() {
    const nuevoPlan: IPlanes = {
      id: this.id ? this.id : 0,
      nombre: this.planForm.value.nombre,
      descripcion: this.planForm.value.descripcion,
      precio: this.planForm.value.precio,
      estado: true,
      mediospagoId: this.planForm.value.mediospagoId,  // Asignar el medio de pago seleccionado
      fechaCreo: this.id ? this.planes.find(p => p.id === this.id)?.fechaCreo : new Date(),
      fechaModifico: this.id ? new Date() : null,
      fechaElimino: null
    };

    if (this.id) {
      this.service.update(nuevoPlan).subscribe({
        next: (response) => {
          console.log('Plan actualizado exitosamente', response);
          this.listPlanes();
          this.resetForm();
        },
        error: (error) => {
          console.error('Error al actualizar el plan', error);
        }
      });
    } else {
      this.service.save(nuevoPlan).subscribe({
        next: (response) => {
          console.log('Registro exitoso', response);
          this.listPlanes();
          this.resetForm();
        },
        error: (error) => {
          console.error('Error al registrar', error);
        }
      });
    }
  }

  eliminarPlan(id: number) {
    this.service.delete(id).subscribe({
      next: () => {
        console.log('Plan eliminado exitosamente');
        this.listPlanes();
      },
      error: (error) => {
        console.error('Error al eliminar el plan', error);
      }
    });
  }

  resetForm() {
    this.planForm.reset();
  }
}
