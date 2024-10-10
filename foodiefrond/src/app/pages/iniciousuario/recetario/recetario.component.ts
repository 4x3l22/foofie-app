import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { RecetarioService } from '../../../service/recetario/recetario.service';
import { IRecetario } from '../../../service/interface/IRecetario';
import { RecetaService } from '../../../service/receta/receta.service';
import { ToastrService } from 'ngx-toastr';
import { IListaRecetas } from '../../../service/interface/IListaRecetas';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-recetario',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './recetario.component.html',
  styleUrl: './recetario.component.css'
})
export class RecetarioComponent implements  OnInit {

  id?: number;
  recetaId?: number;
  userId?: number;
  ListaRecetas: IListaRecetas[] = [];
  recetario: IRecetario[] = [];

  constructor(private router: Router, private serviceRecetario: RecetarioService, private serviceREcetas: RecetaService, private toastr: ToastrService) { }

  ngOnInit(): void {
    this.loadRecetas();
  }

  loadRecetas(){
    const userString = localStorage.getItem('user');
    if (userString) {
      const user = JSON.parse(userString);
      this.userId = user.loginDao.id;
    } else {
      console.error('No se encontró el usuario en el localStorage');
    }
    this.serviceRecetario.load(this.userId!).subscribe({
      next: (data: IRecetario[]) => {
        this.recetario = data;
        if (this.recetario.length > 0) {
          const recetaIds = this.recetario
            .map(receta => receta.recetaId)
            .filter((id): id is number => id !== undefined);

          if (recetaIds.length > 0) {
            this.serviceREcetas.lisRecetas(recetaIds).subscribe({
              next: (recetas: IListaRecetas[]) => {
                this.toastr.success('Cargados con éxito', 'Hecho');
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
              }
            });
          }
        }
      }
    });
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
        estado: true
      }
    });
  }
}
