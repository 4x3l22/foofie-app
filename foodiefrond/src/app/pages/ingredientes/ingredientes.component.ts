import { IIngrediente } from './../../service/interface/IIngredientes';
import { Component, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import DataTables, { Config } from 'datatables.net';
import { Subject } from 'rxjs';
import { DataTablesModule } from 'angular-datatables';
import { CommonModule } from '@angular/common';
import { IngredientesService } from '../../service/ingredientes/ingredientes.service';
import {MatPaginator, MatPaginatorModule} from '@angular/material/paginator';
import {MatTableDataSource, MatTableModule} from '@angular/material/table';
import {AfterViewInit} from '@angular/core';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-ingredientes',
  standalone: true,
  imports: [DataTablesModule, ReactiveFormsModule, CommonModule, MatTableModule, MatPaginatorModule],
  templateUrl: './ingredientes.component.html',
  styleUrls: ['./ingredientes.component.css']
})
export class IngredientesComponent implements OnInit,  AfterViewInit {

  id?: number;
  ingredientForm: FormGroup;
  ingredientes: IIngrediente[] = [];
  displayedColumns: string[] = ['nombre', 'descripcion', 'estado', 'acciones'];
  dataSource = new MatTableDataSource<IIngrediente>(this.ingredientes);

  @ViewChild(MatPaginator) paginator!: MatPaginator;

  constructor(
    private builder: FormBuilder,
    private router: Router,
    private service: IngredientesService
  ) {
    this.ingredientForm = new FormGroup({
      nombre: new FormControl(null, [Validators.required]),
      descripcion: new FormControl(null, [Validators.required])
    });
  }

  ngOnInit(): void {
    this.listarIngredientes();
    this.dataSource.paginator = this.paginator;
  }

  ngAfterViewInit(): void {
    this.dataSource.paginator = this.paginator;
  }

  navigateTo(rura: string){
    this.router.navigate([rura]);
  }

  listarIngredientes() {
    this.service.list().subscribe({
      next: (data: IIngrediente[]) => {
        this.ingredientes = data;
        this.dataSource.data = data;
      }
    });
  }

  cargarIngrediente(ingrediente: IIngrediente) {
    this.ingredientForm.patchValue({
      nombre: ingrediente.nombre,
      descripcion: ingrediente.descripcion
    });
    this.id = ingrediente.id; // Guarda el ID del ingrediente a actualizar
  }

  registrarIngrediente() {
    const nuevoIngrediente: IIngrediente = {
      id: this.id ? this.id : 0,
      nombre: this.ingredientForm.value.nombre,
      descripcion: this.ingredientForm.value.descripcion,
      estado: true,
      fechaCreo: this.id ? this.ingredientes.find(ing => ing.id === this.id)?.fechaCreo : new Date(),
      fechaModifico: this.id ? new Date() : null,
      fechaElimino: null
    };

    if (this.id) {
      this.service.update(nuevoIngrediente).subscribe({
        next: (response) => {
          Swal.fire('Actualizado con éxito', '', 'success');

          console.log('Ingrediente actualizado exitosamente', response);
          this.listarIngredientes();
          this.resetForm();
        },
        error: (error) => {
          Swal.fire({
            title: 'Error',
            text: error.error.message,
          })
        }
      });
    } else {
      this.service.save(nuevoIngrediente).subscribe({
        next: (response) => {
          Swal.fire({
            title: 'Guardado con éxito',
            confirmButtonText: 'vale'
          });
          console.log('Registro exitoso', response);
          this.listarIngredientes();
          this.resetForm();
        },
        error: (error) => {
          Swal.fire({
            title: 'Error',
            text: error.error.message,
            confirmButtonText: 'Vale'
          })
        }
      });
    }
  }

  eliminarIngrediente(id: number) {
    this.service.delete(id).subscribe({
      next: () => {
        console.log('Ingrediente eliminado exitosamente');
        this.listarIngredientes();
      },
      error: (error) => {
        console.error('Error al eliminar el ingrediente', error);
      }
    });
  }

  resetForm() {
    this.ingredientForm.reset();
    this.id = undefined; // Resetea el ID después de guardar
  }
}
