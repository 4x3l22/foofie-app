import { IngredientesService } from './../../../service/ingredientes/ingredientes.service';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { IRecetaIngrediente } from '../../../service/interface/IRecetaIngrediente';
import { RecetaingredienteService } from '../../../service/recetaingrediente/recetaingrediente.service';
import { DataTablesModule } from 'angular-datatables';
import { CommonModule } from '@angular/common';
import { RecetaService } from '../../../service/receta/receta.service';
import { IReceta } from '../../../service/interface/IReceta';
import { IIngrediente } from '../../../service/interface/IIngredientes';
import { Config } from 'datatables.net';
import { Subject } from 'rxjs';
import { NgSelectModule } from '@ng-select/ng-select';
import { Router } from '@angular/router';

@Component({
  selector: 'app-recetaingrediente',
  standalone: true,
  imports: [DataTablesModule, CommonModule, ReactiveFormsModule, NgSelectModule],
  templateUrl: './recetaingrediente.component.html',
  styleUrls: ['./recetaingrediente.component.css']
})
export class RecetaingredienteComponent implements OnInit {

  id?: number;
  recetaIngredienteForm: FormGroup;
  recetaIngredientes: IRecetaIngrediente[] = [];
  receta: IReceta[] = [];
  ingredientes: IIngrediente[] = [];
  dtOptions: Config = {};
  dtTrigger: Subject<any> = new Subject<any>();

  constructor(
    private fb: FormBuilder,
    private recetaIngredienteService: RecetaingredienteService,
    private recetaservice: RecetaService,
    private IngredientesService:  IngredientesService,
    private router: Router
  ) {
    this.recetaIngredienteForm = this.fb.group({
      recetaId: [null, Validators.required],
      ingredienteId: [null, Validators.required],
      estado: [true, Validators.required]
    });
  }

  ngOnInit(): void {
    this.listRecetaIngredientes();
    this.loadRecetas();
    this.loadIngrediens();
    this.dtOptions = {
      pagingType: 'full_numbers',
      pageLength: 5
    };
  }

  navigateTo(ruta:string){
    this.router.navigate([ruta]);
  }

  listRecetaIngredientes() {
    this.recetaIngredienteService.list().subscribe({
      next: (data:  IRecetaIngrediente[]) => {
        this.recetaIngredientes = data;
        this.dtTrigger.next(null);
      },
      error: (error) => {
        console.error('Error al listar los receta ingredientes', error);
      }
    });
  }

  registrarRecetaIngrediente() {
    const recetaIngrediente: IRecetaIngrediente = {
      id: 0,
      recetaId: this.recetaIngredienteForm.value.recetaId,
      ingredienteId: this.recetaIngredienteForm.value.ingredienteId,
      estado: this.recetaIngredienteForm.value.estado,
      fechaCreo: new Date(),
      fechaModifico: null,
      fechaElimino: null
    };

    this.recetaIngredienteService.save(recetaIngrediente).subscribe({
      next: (response) => {
        console.log('Receta Ingrediente registrado con éxito', response);
        this.listRecetaIngredientes();
      },
      error: (error) => {
        console.error('Error al registrar Receta Ingrediente', error);
      }
    });
  }

  eliminarRI(id: number) {
    this.recetaIngredienteService.delete(id).subscribe({
      next: () => {
        console.log('Receta eliminada exitosamente');
        this.listRecetaIngredientes();
      },
      error: (error) => {
        console.error('Error al eliminar la receta', error);
      }
    });
  }

  loadRecetas(){
    this.recetaservice.list().subscribe({
      next: (data: IReceta[]) => {
        this.receta = data;
      }
    })
  }

  loadIngrediens(){
    this.IngredientesService.list().subscribe({
      next: (data: IIngrediente[]) => {
        this.ingredientes = data;
      }
    })
  }

  cargarReceta(recetaIngrediente: IRecetaIngrediente) {
    this.recetaIngredienteForm.patchValue({
      recetaId: recetaIngrediente.recetaId,
      ingredienteId: recetaIngrediente.ingredienteId,
      estado: recetaIngrediente.estado
    });
    this.id = recetaIngrediente.id;
  }
}
