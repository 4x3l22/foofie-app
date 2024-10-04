import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { RecetaService } from '../../../service/receta/receta.service';
import { IReceta } from '../../../service/interface/IReceta';
import * as XLSX from  'xlsx';
import Swal from 'sweetalert2';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-cargamsvr',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './cargamsvr.component.html',
  styleUrl: './cargamsvr.component.css'
})
export class CargamsvrComponent {

  recetas: IReceta[] = [];
  datosExcel: any[] = [];
  mostrarComoTabla: boolean = true;

  constructor(private router: Router, private  servicio: RecetaService) { }

  navigateTo(ruta: string){
    this.router.navigate([ruta]);
  }

  onFileChange(event: any): void {
    const target: DataTransfer = <DataTransfer>(event.target);

    if (target.files.length !== 1) {
      throw new Error('No se puede cargar más de un archivo a la vez');
    }

    const reader: FileReader = new FileReader();

    reader.onload = (e: any) => {
      const binaryString: string = e.target.result;
      const wb: XLSX.WorkBook = XLSX.read(binaryString, { type: 'binary' });
      const wsname: string = wb.SheetNames[0];
      const ws: XLSX.WorkSheet = wb.Sheets[wsname];

      const datosExcel = XLSX.utils.sheet_to_json(ws, { header: 1 })as any[][];

      this.recetas = datosExcel.slice(1).map((row: any[]) => {
        const [nombre, tiempos, imagenreceta, pasos, tipococina] = row;
        const cambio = (tiempos || '').replace(/['"]+/g, '');
        const tiempocorrecto = `0${cambio}`;
        return {
          id: 0,
          nombre: nombre || '',
          tiempos:tiempocorrecto,
          imaganesReceta: imagenreceta || '',
          pasos: pasos || '',
          calificacion: null,
          tipoCocinaId: tipococina || '',
          estado: true,
          fechaCreo: new Date(),
          fechaModifico: null,
          fechaElimino: null
        } as IReceta;
      });

      console.log(this.recetas);
    };

    reader.readAsBinaryString(target.files[0]);
  }

  onSubmit() {
    console.log('Datos a enviar:', this.recetas);
    this.servicio.saveMSV(this.recetas).subscribe(
      (response: any) => {
        // Si la petición es exitosa, mostrar alerta de éxito
        Swal.fire({
          icon: 'success',
          title: '¡Éxito!',
          text: 'Los ingredientes fueron cargados correctamente.',
          confirmButtonText: 'OK'
        });
      },
      (error) => {
        // Si ocurre un error, mostrar alerta de error
        Swal.fire({
          icon: 'error',
          title: 'Error',
          text: 'Ocurrió un error al cargar los ingredientes.',
          confirmButtonText: 'Intentar de nuevo'
        });
        console.error('Error al cargar ingredientes', error);
      }
    );
  }

  toggleView() {
    this.mostrarComoTabla = !this.mostrarComoTabla;
  }
}
