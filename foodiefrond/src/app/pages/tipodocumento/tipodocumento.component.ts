import { Component, OnInit, OnDestroy } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Subject } from 'rxjs';
import { Config } from 'datatables.net';
import { TipodocumentoService } from '../../service/tipodocumento/tipodocumento.service';
import { ITipoDocumento } from '../../service/interface/ITipoDocumento';
import { DataTablesModule } from 'angular-datatables';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-tipo-documento',
  standalone: true,
  imports: [DataTablesModule, CommonModule, ReactiveFormsModule],
  templateUrl: './tipodocumento.component.html',
  styleUrls: ['./tipodocumento.component.css']
})
export class TipoDocumentoComponent implements OnInit, OnDestroy {

  id?  : number;

  tipoDocumentoForm: FormGroup;
  tipoDocumentos: ITipoDocumento[] = [];
  dtOptions: Config = {};
  dtTrigger: Subject<any> = new Subject();

  constructor(
    private fb: FormBuilder,
    private tipoDocumentoService: TipodocumentoService
  ) {
    this.tipoDocumentoForm = new  FormGroup({
      nombre:  new FormControl('', Validators.required),
    });
  }

  ngOnInit(): void {
    this.loadTipoDocumentos();

    this.dtOptions = {
      pagingType: 'full_numbers',
      pageLength: 10,
    };
  }

  loadTipoDocumentos(): void {
    this.tipoDocumentoService.list().subscribe(data => {
      this.tipoDocumentos = data;
      this.dtTrigger.next(null); // Dispara el evento para DataTables
    });
  }

  cargarRol(tipodocumentos: ITipoDocumento): void {
    this.tipoDocumentoForm.patchValue({
      nombre: tipodocumentos.nombre,
    });
    this.id = tipodocumentos.id; // Guarda el ID del rol a actualizar
  }

  registrarTipoDocumento(): void {
    const nuevoTipoDocumento: ITipoDocumento = {
      id: this.id ? this.id : 0,
      nombre: this.tipoDocumentoForm.value.nombre,
      estado: true,
      fechaCreo: this.id ? this.tipoDocumentos.find(d => d.id === this.id)?.fechaCreo : new Date(),
      fechaModifico: this.id ? new Date() : null,
      fechaElimino: null
    };

    if (this.id) {
      // Actualización
      this.tipoDocumentoService.update(nuevoTipoDocumento).subscribe({
        next: (response) => {
          console.log('Tipo de Documento actualizado exitosamente', response);
          this.loadTipoDocumentos();
          this.ngOnDestroy();
        },
        error: (error) => console.error('Error al actualizar el Tipo de Documento', error)
      });
    } else {
      // Registro
      this.tipoDocumentoService.save(nuevoTipoDocumento).subscribe({
        next: (response) => {
          console.log('Tipo de Documento registrado exitosamente', response);
          this.loadTipoDocumentos();
          this.ngOnDestroy();
        },
        error: (error) => console.error('Error al registrar el Tipo de Documento', error)
      });
    }
  }

  deleteTipoDocumento(id: number): void {
    if (confirm('¿Estás seguro de que deseas eliminar este TipoDocumento?')) {
      this.tipoDocumentoService.delete(id).subscribe(() => {
        this.loadTipoDocumentos(); // Recarga la lista después de eliminar
      }, error => {
        console.error('Error al eliminar TipoDocumento:', error);
      });
    }
  }

  ngOnDestroy(): void {
    this.dtTrigger.unsubscribe(); // Limpia el observable al destruir el componente
  }
}
