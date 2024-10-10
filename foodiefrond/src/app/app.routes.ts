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
import { TipoCocinaComponent } from './pages/tiposcocina/tiposcocina.component';
import { MediosPagoComponent } from './pages/mediospago/mediospago.component';
import { PlanesComponent } from './pages/planes/planes.component';
import { RolComponent } from './pages/rol/rol.component';
import { VistaComponent } from './pages/vista/vista.component';
import { RolVistaComponent } from './pages/rolvista/rolvista.component';
import { TipoDocumentoComponent } from './pages/tipodocumento/tipodocumento.component';
import { SignupComponent } from './pages/signup/signup.component';
import { IniciousuarioComponent } from './pages/iniciousuario/iniciousuario.component';
import { HomeuserComponent } from './pages/iniciousuario/homeuser/homeuser.component';
import { CargamsvComponent } from './pages/ingredientes/cargamsv/cargamsv.component';
import { RecetaComponent } from './pages/receta/receta.component';
import { CargamsvrComponent } from './pages/receta/cargamsvr/cargamsvr.component';
import { RecetaingredienteComponent } from './pages/recetaingrediente/recetaingrediente/recetaingrediente.component';
import { RecetauserComponent } from './pages/iniciousuario/recetauser/recetauser.component';
import { CargamsvingreComponent } from './pages/recetaingrediente/cargamsvingre/cargamsvingre.component';

export const routes: Routes = [
  {  path: 'login', component: LoginComponent },
  {  path: 'landing', component:  LandingComponent },
  {  path: 'signup', component: SignupComponent},
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
      { path: 'ingredientes', component:  IngredientesComponent},
      { path: 'tiposcocina',  component: TipoCocinaComponent},
      { path: 'mediospago', component: MediosPagoComponent},
      { path: 'planes', component: PlanesComponent},
      { path: 'rol', component:  RolComponent},
      { path: 'vista', component:  VistaComponent },
      { path: 'rolvista', component: RolVistaComponent},
      { path: 'tipodocumento', component: TipoDocumentoComponent},
      { path: 'cargamsv', component: CargamsvComponent},
      { path: 'receta', component:  RecetaComponent},
      { path: 'cargamasivar', component: CargamsvrComponent},
      { path: 'recetaingrediente', component:  RecetaingredienteComponent },
      { path: 'cargamsvri', component:  CargamsvingreComponent }


    ]
  },
  {
    path: 'iniouser',
    component: IniciousuarioComponent,
    canActivate: [authGuard],
    children: [
      { path: '', redirectTo: 'homeuser', pathMatch: 'full' },
      { path: 'homeuser', component: HomeuserComponent },
      { path: 'recetauser', component: RecetauserComponent },
      { path: '**', redirectTo: 'homeuser' }
    ]
  },

  { path: '**', redirectTo: 'login' }
];
