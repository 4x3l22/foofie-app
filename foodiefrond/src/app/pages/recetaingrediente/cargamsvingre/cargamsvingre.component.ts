import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { IRecetaIngrediente } from '../../../service/interface/IRecetaIngrediente';
import { Router } from '@angular/router';
import { RecetaingredienteService } from '../../../service/recetaingrediente/recetaingrediente.service';
import * as XLSX from  'xlsx';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-cargamsvingre',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './cargamsvingre.component.html',
  styleUrl: './cargamsvingre.component.css'
})
export class CargamsvingreComponent {
  recetasingrediente: IRecetaIngrediente[] = [];
  datosExcel: any[] = [];
  mostrarComoTabla: boolean = true;

  constructor(private router: Router, private  servicio: RecetaingredienteService) { }

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

      this.recetasingrediente = datosExcel.slice(1).map((row: any[]) => {
        const [recetaId, ingredienteId] = row;
        // const cambio = (tiempos || '').replace(/['"]+/g, '');
        // const tiempocorrecto = `0${cambio}`;
        return {
          id: 0,
          recetaId: recetaId || '',
          ingredienteId: ingredienteId || '',
          estado: true,
          fechaCreo: new Date(),
          fechaModifico: null,
          fechaElimino: null
        } as IRecetaIngrediente;
      });

      console.log(this.recetasingrediente);
    };

    reader.readAsBinaryString(target.files[0]);
  }

  onSubmit() {
    console.log('Datos a enviar:', this.recetasingrediente);
    this.servicio.saveMSV(this.recetasingrediente).subscribe(
      (response: any) => {
        // Si la petición es exitosa, mostrar alerta de éxito
        Swal.fire({
          icon: 'success',
          title: '¡Éxito!',
          text: 'Las relaciones fueron cargadas correctamente.',
          confirmButtonText: 'OK'
        });
      },
      (error) => {
        // Si ocurre un error, mostrar alerta de error
        Swal.fire({
          icon: 'error',
          title: 'Error',
          text: 'Ocurrió un error al cargar los conectores de ingredientes y recetas.',
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
