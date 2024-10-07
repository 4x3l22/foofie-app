import { IIngrediente } from './../../../service/interface/IIngredientes';
import { Component, OnInit } from '@angular/core';
import { FormControl, FormsModule } from '@angular/forms';
import { map, Observable, startWith } from 'rxjs';
import { MatAutocompleteModule } from '@angular/material/autocomplete';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatOptionModule } from '@angular/material/core';
import { ReactiveFormsModule } from '@angular/forms';
import {MatSelectModule} from '@angular/material/select';
import { IngredientesService } from '../../../service/ingredientes/ingredientes.service';
import { CommonModule } from '@angular/common';
import { ListarecetasService } from '../../../service/listarecetas/listarecetas.service';
import { IListaRecetas } from '../../../service/interface/IListaRecetas';
import { Router } from '@angular/router';
@Component({
  selector: 'app-homeuser',
  standalone: true,
  imports: [MatFormFieldModule, MatSelectModule, FormsModule, ReactiveFormsModule, CommonModule],
  templateUrl: './homeuser.component.html',
  styleUrls: ['./homeuser.component.css']
})
export class HomeuserComponent implements OnInit {
  message = '';
  desable = true;
  ListaRecetas: IListaRecetas[] = [];
  ingredientes: IIngrediente[] = [];
  toppings = new FormControl<number[]>([]);

  constructor(private service: IngredientesService, private recetasService: ListarecetasService, private router: Router) {}

  ngOnInit(): void {
    this.loadIngredientes();
    this.toppings.valueChanges.subscribe(selectedIds => {
      // console.log('IDs seleccionados:', selectedIds);
      const ids = selectedIds ?? [];
      if(ids.length >= 2){
        this.message = '';
        this.desable = true;
        this.sendIdsToService(selectedIds);
      }else{
        this.message = 'No hay suficientes ingredientes para crear una receta';
        this.desable = false;
      }
    });
  }

  loadIngredientes() {
    this.service.list().subscribe({
      next: (data: IIngrediente[]) => {
        this.ingredientes = data;
      }
    });
  }

  obtenerNombresIngredientes(ids: number[] | null): string {
    if (!ids || ids.length === 0) {
      return '';
    }
    return ids
      .map(id => this.obtenerNombreIngrediente(id))
      .join(', ');
  }

  obtenerNombreIngrediente(id: number): string {
    const ingrediente = this.ingredientes.find(ing => ing.id === id);
    return ingrediente ? ingrediente.nombre : 'Desconocido';
  }

  private sendIdsToService(ids: number[] | null) {
    if (ids && ids.length > 0) {
      this.recetasService.getRecetas(ids).subscribe({
        next: (recetas:  IListaRecetas[]) => {
          this.ListaRecetas = recetas.map(receta => ({
            id:  receta.id,
            nombre: receta.nombre,
            descripcion: receta.descripcion,
            tiempos:  receta.tiempos,
            imaganesReceta: this.convertirBase64AUrl(receta.imaganesReceta),
            pasos: receta.pasos,
            calificacion: receta.calificacion,
            estado: receta.estado,
            tipoCocinaId: receta.tipoCocinaId
          }));
        },
        error: (err) => {
          console.error('Error al obtener recetas:', err);
        }
      });
    } else {
      console.log('No se seleccionaron IDs.');
    }
  }

  convertirBase64AUrl(base64: string): string {
    // Limpiar la cadena base64
    base64 = base64.trim();

    // Asegurarse de que la longitud sea un múltiplo de 4
    while (base64.length % 4 !== 0) {
        base64 += '=';
    }

    // Reemplazar caracteres especiales que podrían estar presentes
    base64 = base64.replace(/[^A-Za-z0-9+/=]/g, '');

    // Si la cadena es válida, construir la URL
    if (base64) {
        // console.log("debug:  "+'data:image/png;base64,'+base64);

        return 'data:image/jpeg;base64,' + base64;
    } else {
        console.error('La cadena base64 está vacía o es inválida');
        return ''; // O algún valor predeterminado
    }
  }

  navigateTo(ruta: string, id: number){
    this.router.navigate([ruta]);
    sessionStorage.setItem('receta',id.toString());
  }

}
