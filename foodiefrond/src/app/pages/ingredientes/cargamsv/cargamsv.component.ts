import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import * as XLSX from  'xlsx';
import { IIngrediente } from '../../../service/interface/IIngredientes';
import { Router } from '@angular/router';
import { IngredientesService } from '../../../service/ingredientes/ingredientes.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-cargamsv',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './cargamsv.component.html',
  styleUrl: './cargamsv.component.css'
})
export class CargamsvComponent {

  ingredientes: IIngrediente[] = [];
  datosExcel: any[] = [];
  mostrarComoTabla: boolean = true;

  constructor(private router: Router, private  servicio: IngredientesService) { }

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

      this.ingredientes = datosExcel.slice(1).map((row: any[]) => {
        const [id, nombre, descripcion] = row;
        return {
          id: id || '',
          nombre: nombre || '',
          descripcion: descripcion || '',
          estado: true,
          fechaCreo: new Date(),
          fechaModifico: null,
          fechaElimino: null
        } as IIngrediente;
      });

      console.log(this.ingredientes);
    };

    reader.readAsBinaryString(target.files[0]);
  }

  onSubmit() {
    console.log('Datos a enviar:', this.ingredientes);
    this.servicio.saveMSV(this.ingredientes).subscribe(
      (response: any) => {
        // Si la petición es exitosa, mostrar alerta de éxito
        Swal.fire({
          icon: 'success',
          title: '¡Éxito!',
          text: 'Los ingredientes fueron cargados correctamente.',
          confirmButtonText: 'Vale'
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
