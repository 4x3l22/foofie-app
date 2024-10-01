import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Subject } from 'rxjs';
import { IMediosPago } from '../../service/interface/IMediosPago';
import DataTables, { Config } from 'datatables.net';
import { MediospagoService } from '../../service/mediospago/mediospago.service';
import { DataTablesModule } from 'angular-datatables';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-medios-pago',
  standalone: true,
  imports: [DataTablesModule, CommonModule, ReactiveFormsModule],
  templateUrl: './mediospago.component.html',
  styleUrls: ['./mediospago.component.css']
})
export class MediosPagoComponent implements OnInit {

  id?: number;
  mediosPagoForm: FormGroup;
  mediosPago: IMediosPago[] = [];
  dtOptions: Config = {};
  dttrigger: Subject<any> = new Subject<any>();

  constructor(
    private builder: FormBuilder,
    private router: Router,
    private service: MediospagoService
  ) {
    this.mediosPagoForm = this.builder.group({
      nombre: new FormControl(null, [Validators.required]),
      descripcion: new FormControl(null, [Validators.required]),
      estado: new FormControl(true, [Validators.required])
    });
  }

  ngOnInit(): void {
    this.listMediosPago();
    this.dtOptions = {
      pagingType: "full_numbers",
      lengthMenu: [5, 10, 15, 20]
    };
  }

  listMediosPago() {
    this.service.list().subscribe({
      next: (data: IMediosPago[]) => {
        this.mediosPago = data;
        this.dttrigger.next(null);
      }
    });
  }

  cargarMediosPago(mediosPago: IMediosPago) {
    this.mediosPagoForm.patchValue({
      nombre: mediosPago.nombre,
      descripcion: mediosPago.descripcion,
      estado: mediosPago.estado
    });
    this.id = mediosPago.id;
  }

  registrarMediosPago() {
    const nuevoMediosPago: IMediosPago = {
      id: this.id ? this.id : 0,
      nombre: this.mediosPagoForm.value.nombre,
      descripcion: this.mediosPagoForm.value.descripcion,
      estado: this.mediosPagoForm.value.estado,
      fechaCreo: this.id ? this.mediosPago.find(mp => mp.id === this.id)?.fechaCreo : new Date(),
      fechaModifico: this.id ? new Date() : null,
      fechaElimino: null
    };

    if (this.id) {
      this.service.update(nuevoMediosPago).subscribe({
        next: (response) => {
          console.log('Medio de Pago actualizado exitosamente', response);
          this.listMediosPago();
          this.resetForm();
        },
        error: (error) => {
          console.error('Error al actualizar el medio de pago', error);
        }
      });
    } else {
      this.service.save(nuevoMediosPago).subscribe({
        next: (response) => {
          console.log('Registro exitoso', response);
          this.listMediosPago();
          this.resetForm();
        },
        error: (error) => {
          console.error('Error al registrar el medio de pago', error);
        }
      });
    }
  }

  eliminarMediosPago(id: number) {
    this.service.delete(id).subscribe({
      next: () => {
        console.log('Medio de Pago eliminado exitosamente');
        this.listMediosPago();
      },
      error: (error) => {
        console.error('Error al eliminar el medio de pago', error);
      }
    });
  }

  resetForm() {
    this.mediosPagoForm.reset();
  }
}
