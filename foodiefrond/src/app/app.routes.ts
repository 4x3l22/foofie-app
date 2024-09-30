import { Routes } from '@angular/router';
import { LoginComponent } from './pages/login/login.component';
import { LandingComponent } from './pages/landing/landing.component';
import { StarComponent } from './pages/star/star.component';
import { authGuard } from './guards/auth.guard';
import { HomeComponent } from './pages/home/home.component';
import { ModuloComponent } from './pages/modulo/modulo.component';
import { ContinenteComponent } from './pages/continente/continente.component';
import { PaisComponent } from './pages/pais/pais.component';
import { CiudadComponent } from './pages/ciudad/ciudad.component';
import { IngredientesComponent } from './pages/ingredientes/ingredientes.component';

export const routes: Routes = [
  {  path: 'login', component: LoginComponent },
  {  path: 'landing', component:  LandingComponent },
  {   path: '', redirectTo: 'landing', pathMatch: 'full' },
  {
    path: 'star',
    component: StarComponent,
    canActivate: [authGuard],
    children: [
      { path: 'home', component: HomeComponent},
      { path: 'modulo', component: ModuloComponent},
      { path: 'continente'  , component: ContinenteComponent },
      { path: 'pais', component: PaisComponent},
      { path: 'ciudad', component: CiudadComponent},
      { path: 'ingredientes', component:  IngredientesComponent}


    ]
  },
  { path: '**', redirectTo: 'login' }
];
