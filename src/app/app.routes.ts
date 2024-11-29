import { Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { AccesoComponent } from './component/acceso/acceso.component';
import { PerfilUsuarioComponent } from './component/perfil-usuario/perfil-usuario.component';
import { LoginComponent } from './login/login.component';
import { LayoutComponent } from './LayoutDefault/layout/layout.component';
import { SolicitudComponent } from './component/solicitud/solicitud.component';
import { PPPComponent } from './component/ppp/ppp.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { AuthGuard } from './auth.guard';
import { InsertarDatosComponent } from './component/insertar-datos/insertar-datos.component';
import { RolComponent } from './component/rol/rol.component';
import { CarreraComponent } from './component/carrera/carrera.component';
import { RubroComponent } from './component/rubro/rubro.component';
import { CargoComponent } from './component/cargo/cargo.component';
import { SoliCordComponent } from './compWeb/soli-cord/soli-cord.component';
import { ConsolidadoComponent } from './component/consolidado/consolidado.component';
import { GestionAccesosRolesComponent } from './component/gestion-accesos-roles/gestion-accesos-roles.component';
import { UsuarioRolComponent } from './component/usuario-rol/usuario-rol.component';
import { DocComponent } from './component/doc/doc.component';
import { PersonaComponent } from './component/persona/persona.component';
import { UnauthorizedComponent } from './compWeb/unauthorized/unauthorized.component';
import { roleGuard } from './role.guard';

export const routes: Routes = [
  {
    path: '',
    component: LoginComponent,
    title: 'Login',
  },
  {
    path: 'unauthorized',
    component: UnauthorizedComponent,
  },
  {
    path: 'ppp',
    component: PPPComponent,
    title: 'Página PPP',
    canActivate: [roleGuard],
    data: { roles: ['ESTUDIANTE'] },
  },
  {
    path: 'dashboard',
    component: DashboardComponent,
    title: 'Dashboard',
    canActivate: [AuthGuard],
  },
  {
    path: 'layout',
    component: LayoutComponent,
    canActivate: [AuthGuard],
    children: [
      {
        path: 'inicio',
        component: HomeComponent,
        title: 'Inicio',
      },
      {
        path: 'insertarDatos',
        component: InsertarDatosComponent,
        title: 'Página InsertarDatos',
        canActivate: [roleGuard],
        data: { roles: ['ADMIN'] },
      },
      {
        path: 'accesos',
        component: AccesoComponent,
        title: 'Página accesos',
        canActivate: [roleGuard],
        data: { roles: ['ADMIN'] },
      },
      {
        path: 'roles',
        component: RolComponent,
        title: 'Página roles',
        canActivate: [roleGuard],
        data: { roles: ['ADMIN'] },
      },
      {
        path: 'carreras',
        component: CarreraComponent,
        title: 'Página carreras',
        canActivate: [roleGuard],
        data: { roles: ['ADMIN'] },
      },
      {
        path: 'rubros',
        component: RubroComponent,
        title: 'Página rubros',
        canActivate: [roleGuard],
        data: { roles: ['COORDINADORPPP'] },
      },
      {
        path: 'cargos',
        component: CargoComponent,
        title: 'Página cargos',
        canActivate: [roleGuard],
        data: { roles: ['ADMIN'] },
      },
      {
        path: 'solicitudes-practica',
        component: SoliCordComponent,
        title: 'Página SolicitudCord',
        canActivate: [roleGuard],
        data: { roles: ['COORDINADORPPP'] },
      },
      {
        path: 'consolidado',
        component: ConsolidadoComponent,
        title: 'Página consolidado',
        canActivate: [roleGuard],
        data: { roles: ['COORDINADORPPP'] },
      },
      {
        path: 'gestionPermisos',
        component: GestionAccesosRolesComponent,
        title: 'Página Gestion de Permisos',
        canActivate: [roleGuard],
        data: { roles: ['ADMIN'] },
      },
      {
        path: 'documentos',
        component: DocComponent,
        title: 'Página Gestion de documentos',
        canActivate: [roleGuard],
        data: { roles: ['ESTUDIANTE'] },
      },
      {
        path: 'gestionarUsuarios',
        component: UsuarioRolComponent,
        title: 'Página Gestion de Usuarios',
        canActivate: [roleGuard],
        data: { roles: ['SECRETARIA'] },
      },
      {
        path: 'personas',
        component: PersonaComponent,
        title: 'Página Gestion Personas',
        canActivate: [roleGuard],
        data: { roles: ['SECRETARIA'] },
      },
    ],
  },
  {
    path: '**',
    redirectTo: '',
    pathMatch: 'full',
  },
];
