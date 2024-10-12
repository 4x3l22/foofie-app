import { state } from '@angular/animations';
import { IIngrediente } from './../../../service/interface/IIngredientes';
import { Component, OnInit } from '@angular/core';
import { FormControl, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { IngredientesService } from '../../../service/ingredientes/ingredientes.service';
import { ListarecetasService } from '../../../service/listarecetas/listarecetas.service';
import { IListaRecetas } from '../../../service/interface/IListaRecetas';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatSelectModule } from '@angular/material/select';
import { MatInputModule } from '@angular/material/input';
import { CommonModule } from '@angular/common';
import { map, Observable, startWith } from 'rxjs';
import {MatAutocompleteModule} from '@angular/material/autocomplete';
import {MatIconModule} from '@angular/material/icon';
import {MatChipsModule} from '@angular/material/chips';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-homeuser',
  standalone: true,
  imports: [
    // Importar módulos necesarios
    MatFormFieldModule, MatAutocompleteModule, MatInputModule, MatIconModule, MatChipsModule, ReactiveFormsModule, CommonModule
  ],
  templateUrl: './homeuser.component.html',
  styleUrls: ['./homeuser.component.css']
})
export class HomeuserComponent implements OnInit {

  id?: number;
  message = '';
  desable = true;
  ListaRecetas: IListaRecetas[] = [];
  ingredientes: IIngrediente[] = [];
  selectedIngredientes: IIngrediente[] = [];  // Lista de IDs seleccionados
  ingredientControl = new FormControl();
  filteredIngredientes!: Observable<IIngrediente[]>;
  valida = true;
  ms400 = '';

  constructor(
    private service: IngredientesService,
    private recetasService: ListarecetasService,
    private router: Router,
    private route: ActivatedRoute
  ) {}

  ngOnInit(): void {
    this.loadIngredientes();

    // Filtrar ingredientes basados en la búsqueda
    this.filteredIngredientes = this.ingredientControl.valueChanges.pipe(
      startWith(''),
      map(value => this._filter(value || ''))
    );

    if(this.valida == true){
      this.message = "En la barra de busqueda de arriba, ingrese el nombre de un ingrediente para buscarlo.";

    }
  }

  // Cargar ingredientes desde el servicio
  loadIngredientes() {
    this.service.list().subscribe({
      next: (data: IIngrediente[]) => {
        this.ingredientes = data;
      }
    });
  }

  // Filtrar ingredientes
  private _filter(value: string): IIngrediente[] {
    const filterValue = value.toLowerCase();
    return this.ingredientes
      .filter(ingrediente =>
        ingrediente.nombre.toLowerCase().includes(filterValue) &&
        !this.selectedIngredientes.some(selected => selected.id === ingrediente.id)  // Excluir ingredientes seleccionados
      );
  }

  // Cuando se selecciona un ingrediente del autocompletado
  onSelect(ingrediente: IIngrediente) {
    // Verificar si el ingrediente no ha sido ya seleccionado
    if (!this.selectedIngredientes.some(i => i.id === ingrediente.id)) {
      this.selectedIngredientes.push(ingrediente);  // Agregar ingrediente seleccionado al array
    }

    // Restablecer el valor del control a una cadena vacía
    this.ingredientControl.setValue('');

    // Actualizar los ingredientes filtrados para que no aparezcan los ya seleccionados
    this.filteredIngredientes = this.ingredientControl.valueChanges.pipe(
      startWith(''),
      map(value => this._filter(value || ''))
    );

    // Enviar los IDs de los ingredientes seleccionados al servicio
    const selectedIds = this.selectedIngredientes.map(i => i.id);
    this.sendIdsToService(selectedIds);
  }


  // Obtener el nombre del ingrediente basado en el ID
  obtenerNombreIngrediente(id: number): string {
    const ingrediente = this.ingredientes.find(ing => ing.id === id);
    return ingrediente ? ingrediente.nombre : 'Desconocido';
  }


  remove(ingrediente: IIngrediente): void {
    const index = this.selectedIngredientes.indexOf(ingrediente);
    if (index >= 0) {
      this.selectedIngredientes.splice(index, 1);
    }

    // Enviar los IDs de los ingredientes seleccionados actualizados al servicio
    const selectedIds = this.selectedIngredientes.map(i => i.id);

    // Si no hay ingredientes seleccionados, mostrar el mensaje por defecto y limpiar la lista de recetas
    if (this.selectedIngredientes.length === 0) {
      this.valida = true;
      this.message = "En la barra de búsqueda de arriba, ingrese el nombre de un ingrediente para buscarlo.";
      this.ListaRecetas = [];  // Limpiar las recetas
    }

    // Actualizar el autocompletado
    this.filteredIngredientes = this.ingredientControl.valueChanges.pipe(
      startWith(''),
      map(value => this._filter(value || ''))
    );

    this.sendIdsToService(selectedIds);  // Llamar al servicio para actualizar si hay ingredientes seleccionados
  }

  // Método para enviar los ingredientes seleccionados al servicio
  private sendIdsToService(ids: number[] | null) {
    if (ids && ids.length > 1) {
      this.recetasService.getRecetas(ids).subscribe({
        next: (recetas: IListaRecetas[]) => {
          console.log(recetas.length);
          if(ids.length >= 2){
            this.valida = false;
            this.message = "";
          }
          this.ListaRecetas = recetas.map(receta => ({
            id: receta.id,
            nombre: receta.nombre,
            descripcion: receta.descripcion,
            tiempos: receta.tiempos,
            imaganesReceta: this.convertirBase64AUrl(receta.imaganesReceta),
            pasos: receta.pasos,
            calificacion: receta.calificacion,
            estado: receta.estado,
            tipoCocinaId: receta.tipoCocinaId
          }));
        },
        error: (err) => {
          if(err.status == 404){
            this.valida = true;
            this.message = "No hay recetas registradas con esos ingredientes, le pedimos tenga paciencia mientras agregamos más 🙇‍♂️";
          }else if(err.status == 400){
            this.message = "Debe seleccionar al menos dos ingredientes.";
          }
          console.error('Error al obtener recetas:', err);
        }
      });
    } else if(ids && ids.length == 0){
      this.valida = true;
      this.message = "En la barra de búsqueda de arriba, ingrese el nombre de un ingrediente para buscarlo.";
    }else{
      // Si no hay ingredientes seleccionados, limpiar la lista de recetas y mostrar mensaje por defecto
      this.valida = true;
      this.message = "Debe seleccionar al menos dos ingredientes.";
      this.ListaRecetas = [];
    }
  }


  convertirBase64AUrl(base64: string): string {
    base64 = base64.trim();
    while (base64.length % 4 !== 0) {
      base64 += '=';
    }
    base64 = base64.replace(/[^A-Za-z0-9+/=]/g, '');
    return base64 ? 'data:image/jpeg;base64,' + base64 : '';
  }

  navigateTo(receta: IListaRecetas) {
    this.router.navigate(['iniouser/recetauser'],{
      state:{
        id:  receta.id,
        nombre: receta.nombre,
        descripcion: receta.descripcion,
        imaganesReceta: receta.imaganesReceta,
        pasos: receta.pasos,
      }
    });
  }

}
