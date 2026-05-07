import { Routes } from '@angular/router';
import { authGuard } from './guards/auth-guard';
import { Router } from '@angular/router';

export const routes: Routes = [
  {
    path: '',
    loadComponent: () =>
      import('./home/home.component').then(m => m.HomeComponent)
  },
  {
    path: 'home',
    loadComponent: () =>
      import('./home/home.component').then(m => m.HomeComponent)
  },
  {
    path: 'login',
    loadComponent: () =>
      import('./login/login.component').then(m => m.LoginComponent)
  },
  {
    path: 'dashboard',
    canActivate: [authGuard],
    loadComponent: () =>
      import('./dashboard/dashboard.component').then(m => m.DashboardComponent)
  },
  {
    path: 'admin-productos',
    canActivate: [authGuard],
    loadComponent: () =>
      import('./admin-productos/admin-productos.component').then(m => m.AdminProductosComponent)
  },
  {
    path: 'admin-sugerencias',
    canActivate: [authGuard],
    loadComponent: () =>
      import('./admin-sugerencias/admin-sugerencias.component').then(m => m.AdminSugerenciasComponent)
  },
  {
    path: 'servicios',
    loadComponent: () =>
      import('./servicios/servicios.component').then(m => m.ServiciosComponent)
  },
  {
    path: 'admin-servicios',
    canActivate: [authGuard],
    loadComponent: () =>
      import('./admin-servicios/admin-servicios.component').then(m => m.AdminServiciosComponent)
  },
  {
    path: 'admin-solicitudes-servicio',
    canActivate: [authGuard],
    loadComponent: () =>
      import('./admin-solicitudes-servicio/admin-solicitudes-servicio.component')
        .then(m => m.AdminSolicitudesServicioComponent)
  },
  {
    path: '**',
    redirectTo: ''
  }
];