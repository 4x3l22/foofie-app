import { Component } from '@angular/core';
import { Router, RouterOutlet } from '@angular/router';
import { MenuDto } from '../../service/interface/MenuDto';
import { IMenu } from '../../service/interface/Imenu';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-menu',
  standalone: true,
  imports: [RouterOutlet, CommonModule],
  templateUrl: './menu.component.html',
  styleUrl: './menu.component.css'
})
export class MenuComponent {

  modules: { moduleName: string, views: { viewName: string, route: string }[] }[] = [];

  constructor(private router: Router) {}

  ngOnInit(): void {
    this.loadMenu();
  }

  loadMenu(): void {
    const storedData = localStorage.getItem('user');
    if (storedData) {
      try {
        const parsedData: IMenu = JSON.parse(storedData);
        if (parsedData.success && parsedData.menuDto) {
          this.modules = this.groupByModule(parsedData.menuDto);
          console.log('Menú cargado:', this.modules);
        } else {
          console.warn('El formato del menú en localStorage no es válido');
        }
      } catch (error) {
        console.error('Error al parsear el menú desde localStorage', error);
      }
    } else {
      console.warn('No hay datos de menú en localStorage');
    }
  }

  isString(value: any): value is string {
    return typeof value === 'string';
  }

  // Agrupar las vistas por módulo
  groupByModule(menuDto: MenuDto[]): { moduleName: string, views: { viewName: string, route: string }[] }[] {
    const grouped = menuDto.reduce((acc, view) => {
      if (!acc[view.moduloId]) {
        acc[view.moduloId] = { moduleName: view.nombreModulo, views: [] };
      }
      // Crear ruta en formato 'main/nombreDeLaVista'
      const route = `star/${view.nombreVista.toLowerCase()}`;
      console.log("rutas "+route);
      if(!this.isString(route)){
        console.error(`Ruta no válida: ${route}`);
        return acc;
      }
      acc[view.moduloId].views.push({ viewName: view.nombreVista, route });
      return acc;
    }, {} as { [moduleId: number]: { moduleName: string, views: { viewName: string, route: string }[] } });

    // Convertir el objeto agrupado en un array
    return Object.values(grouped);
  }

  navegation(route: string): void {
    this.router.navigate([route]);
  }

  logOut(): void {
    localStorage.removeItem('user');
  }
}
