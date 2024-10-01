import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Subject } from 'rxjs';
import { RolService } from '../../service/rol/rol.service';  // Asegúrate de crear este servicio para interactuar con la API
import { IRol } from '../../service/interface/IRol';  // Importa la interfaz de Rol
import { DataTablesModule } from 'angular-datatables';
import { CommonModule } from '@angular/common';
import { Config } from 'datatables.net';

@Component({
  selector: 'app-rol',
  standalone: true,
  imports: [DataTablesModule, CommonModule, ReactiveFormsModule],
  templateUrl: './rol.component.html',
  styleUrls: ['./rol.component.css']
})
export class RolComponent implements OnInit {
  id?: number;
  rolForm: FormGroup;
  roles: IRol[] = [];
  dtOptions: Config = {};
  dtTrigger: Subject<any> = new Subject<any>();

  constructor(
    private builder: FormBuilder,
    private router: Router,
    private rolService: RolService
  ) {
    this.rolForm = new FormGroup({
      nombre: new FormControl(null, [Validators.required]),
      descripcion: new FormControl(null, [Validators.required])
    });
  }

  ngOnInit(): void {
    this.listRoles();
    this.dtOptions = {
      pagingType: 'full_numbers',
      pageLength: 10,
    };
  }

  listRoles(): void {
    this.rolService.list().subscribe({
      next: (data: IRol[]) => {
        this.roles = data;
        this.dtTrigger.next(null);
      },
      error: (error) => console.error('Error al listar roles', error)
    });
  }

  cargarRol(rol: IRol): void {
    this.rolForm.patchValue({
      nombre: rol.nombre,
      descripcion: rol.descripcion
    });
    this.id = rol.id; // Guarda el ID del rol a actualizar
  }

  registrarRol(): void {
    const nuevoRol: IRol = {
      id: this.id ? this.id : 0,
      nombre: this.rolForm.value.nombre,
      descripcion: this.rolForm.value.descripcion,
      estado: true,
      fechaCreo: this.id ? this.roles.find(r => r.id === this.id)?.fechaCreo : new Date(),
      fechaModifico: this.id ? new Date() : null,
      fechaElimino: null
    };

    if (this.id) {
      this.rolService.update(nuevoRol).subscribe({
        next: (response) => {
          console.log('Rol actualizado exitosamente', response);
          this.listRoles();
          this.resetForm();
        },
        error: (error) => console.error('Error al actualizar el rol', error)
      });
    } else {
      this.rolService.save(nuevoRol).subscribe({
        next: (response) => {
          console.log('Rol registrado exitosamente', response);
          this.listRoles();
          this.resetForm();
        },
        error: (error) => console.error('Error al registrar el rol', error)
      });
    }
  }

  eliminarRol(id: number): void {
    this.rolService.delete(id).subscribe({
      next: () => {
        console.log('Rol eliminado exitosamente');
        this.listRoles();
      },
      error: (error) => console.error('Error al eliminar el rol', error)
    });
  }

  resetForm(): void {
    this.rolForm.reset();
    this.id = undefined;
  }
}
