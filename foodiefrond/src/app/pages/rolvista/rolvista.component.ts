import { Component, OnInit, OnDestroy } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Subject } from 'rxjs';
import { DataTableDirective, DataTablesModule } from 'angular-datatables';
import { Config } from 'datatables.net';
import { IRolVista } from '../../service/interface/IRolVista';
import { RolService } from '../../service/rol/rol.service';
import { VistaService } from '../../service/vista/vista.service';
import { RolvistaService } from '../../service/rolvista/rolvista.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-rolvista',
  standalone: true,
  imports: [DataTablesModule, CommonModule, ReactiveFormsModule],
  templateUrl: './rolvista.component.html',
  styleUrls: ['./rolvista.component.css']
})
export class RolVistaComponent implements OnInit, OnDestroy {
  rolVistaForm: FormGroup;
  rolVistas: IRolVista[] = [];
  roles: any[] = []; // Ajusta el tipo según tu modelo de Rol
  vistas: any[] = []; // Ajusta el tipo según tu modelo de Vista
  dtOptions: Config = {};
  dtTrigger: Subject<any> = new Subject();

  constructor(
    private fb: FormBuilder,
    private rolService: RolService,
    private vistaService: VistaService,
    private rolVistaService: RolvistaService
  ) {
    this.rolVistaForm = this.fb.group({
      rolId: [null, Validators.required],
      vistaId: [null, Validators.required],
      estado: [true],
    });
  }

  ngOnInit(): void {
    this.loadRolVistas();
    this.loadRoles();
    this.loadVistas();

    this.dtOptions = {
      pagingType: 'full_numbers',
      pageLength: 10,
    };
  }

  loadRolVistas(): void {
    this.rolVistaService.list().subscribe(data => {
      this.rolVistas = data;
      this.dtTrigger.next(null); // Dispara el evento para DataTables
    });
  }

  loadRoles(): void {
    this.rolService.list().subscribe(data => {
      this.roles = data;
    });
  }

  loadVistas(): void {
    this.vistaService.list().subscribe(data => {
      this.vistas = data;
    });
  }

  saveRolVista(): void {
    if (this.rolVistaForm.valid) {
      const rolVista: IRolVista = this.rolVistaForm.value;
      this.rolVistaService.save(rolVista).subscribe(response => {
        this.loadRolVistas(); // Recarga la lista después de guardar
        this.rolVistaForm.reset(); // Reinicia el formulario
      }, error => {
        console.error('Error al guardar RolVista:', error);
      });
    }
  }

  deleteRolVista(id: number): void {
    if (confirm('¿Estás seguro de que deseas eliminar este RolVista?')) {
      this.rolVistaService.delete(id).subscribe(() => {
        this.loadRolVistas(); // Recarga la lista después de eliminar
      }, error => {
        console.error('Error al eliminar RolVista:', error);
      });
    }
  }

  ngOnDestroy(): void {
    this.dtTrigger.unsubscribe(); // Limpia el observable al destruir el componente
  }
}
