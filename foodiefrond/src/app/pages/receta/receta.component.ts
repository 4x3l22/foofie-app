import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { IReceta } from '../../service/interface/IReceta';
import { RecetaService } from '../../service/receta/receta.service';
import { Subject } from 'rxjs';
import { Config } from 'datatables.net';
import { DataTablesModule } from 'angular-datatables';
import { CommonModule } from '@angular/common';
import { TipococinaService } from '../../service/tipococina/tipococina.service';
import { ITipoCocina } from '../../service/interface/ITipoCocina';

@Component({
  selector: 'app-receta',
  standalone: true,
  imports: [DataTablesModule, CommonModule, ReactiveFormsModule],
  templateUrl: './receta.component.html',
  styleUrls: ['./receta.component.css']
})
export class RecetaComponent implements OnInit {
  id?: number;
  recetaForm: FormGroup;
  recetas: IReceta[] = [];
  tiposCocina: ITipoCocina[] = [];
  dtOptions: Config = {};
  dtTrigger: Subject<any> = new Subject<any>();
  fotoPerfilBase64?: string;

  constructor(
    private builder: FormBuilder,
    private router: Router,
    private recetaService: RecetaService,
    private cocinaService: TipococinaService
  ) {
    this.recetaForm = new FormGroup({
      nombre: new FormControl(null, [Validators.required]),
      tiempos: new FormControl(null, [Validators.required]),
      imagenesReceta: new FormControl(null, [Validators.required]),
      pasos: new FormControl(null, [Validators.required]),
      calificacion: new FormControl(0, [Validators.required]),
      estado: new FormControl(true, [Validators.required]),
      tipoCocinaId: new FormControl(null, [Validators.required])
    });
  }

  ngOnInit(): void {
    this.listRecetas();
    this.listTipCocinas();
    this.dtOptions = {
      pagingType: 'full_numbers',
      pageLength: 10
    };
  }

  navigateTo(ruta: string){
    this.router.navigate([ruta]);
  }

  listRecetas() {
    this.recetaService.list().subscribe({
      next: (data: IReceta[]) => {
        this.recetas = data;
        this.dtTrigger.next(null);
      },
      error: (error) => {
        console.error('Error al listar las recetas', error);
      }
    });
  }

  listTipCocinas(){
    this.cocinaService.list().subscribe({
      next: (data: ITipoCocina[]) => {
        this.tiposCocina = data;
      }
    })
  }

  registrarReceta() {
    const tiempoInput = this.recetaForm.value.tiempos;
    const tiempoCompleto = `${tiempoInput}:00`;

    if (this.recetaForm.valid) {
      const nuevaReceta: IReceta = {
        id: this.id ? this.id : 0,
        nombre: this.recetaForm.value.nombre,
        tiempos: tiempoCompleto,
        imaganesReceta: this.recetaForm.value.imagenesReceta,
        pasos: this.recetaForm.value.pasos,
        calificacion: this.recetaForm.value.calificacion,
        estado: this.recetaForm.value.estado,
        tipoCocinaId: this.recetaForm.value.tipoCocinaId,
        fechaCreo: this.id ? this.recetas.find(r => r.id === this.id)?.fechaCreo : new Date(),
        fechaModifico: this.id ? new Date() : null,
        fechaElimino: null
      };

      if (this.id) {
        this.recetaService.update(nuevaReceta).subscribe({
          next: (response) => {
            console.log('Receta actualizada exitosamente', response);
            this.listRecetas();
            this.resetForm();
          },
          error: (error) => {
            console.error('Error al actualizar la receta', error);
          }
        });
      } else {
        this.recetaService.save(nuevaReceta).subscribe({
          next: (response) => {
            console.log('Receta registrada exitosamente', response);
            this.listRecetas();
            this.resetForm();
          },
          error: (error) => {
            console.error('Error al registrar la receta', error);
          }
        });
      }
    }
  }


  eliminarReceta(id: number) {
    this.recetaService.delete(id).subscribe({
      next: () => {
        console.log('Receta eliminada exitosamente');
        this.listRecetas();
      },
      error: (error) => {
        console.error('Error al eliminar la receta', error);
      }
    });
  }

  cargarReceta(receta: IReceta) {
    this.recetaForm.patchValue({
      nombre: receta.nombre,
      tiempos: receta.tiempos,
      imagenesReceta: receta.imaganesReceta,
      pasos: receta.pasos,
      calificacion: receta.calificacion,
      estado: receta.estado,
      tipoCocinaId: receta.tipoCocinaId
    });
    this.id = receta.id;
  }

  onFileChange(event: Event) {
    const input = event.target as HTMLInputElement;
    if (input.files && input.files.length > 0) {
      const file = input.files[0];
      const reader = new FileReader();

      reader.readAsDataURL(file);
      reader.onload = () => {
        this.fotoPerfilBase64 = reader.result as string;
        // Asignar el valor al control del formulario
        this.recetaForm.patchValue({
          imagenesReceta: this.fotoPerfilBase64 // Asigna aquí
        });
      };
    }
  }



  resetForm() {
    this.recetaForm.reset();
  }
}
