import { IModulo } from './../../service/interface/IModulo';
import { Component, OnInit } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { Router } from '@angular/router';
import DataTables, { Config } from 'datatables.net';
import { Subject } from 'rxjs';
import { ModuloService } from '../../service/modulo/modulo.service';
import { DataTablesModule } from 'angular-datatables';

@Component({
  selector: 'app-modulo',
  standalone: true,
  imports: [DataTablesModule],
  templateUrl: './modulo.component.html',
  styleUrl: './modulo.component.css'
})
export class ModuloComponent implements OnInit {

  modulos: IModulo[] = [];
  dtOptions: Config={}
  dttrigger: Subject<any> = new  Subject<any>();

  constructor(
    private builder: FormBuilder,
    private router:  Router,
    private service:  ModuloService

  ){}

  ngOnInit(): void {
    this.listModulos();
    this.dtOptions={
      pagingType: "full_numbers",
      lengthMenu: [5,10,15,20]
    };
  }

  listModulos(){
    this.service.getModulo().subscribe(
      {
        next: (data: IModulo[]) => {
          this.modulos=data;
          console.log(this.modulos);
          this.dttrigger.next(null);
        }
      }
    )
  }
}
