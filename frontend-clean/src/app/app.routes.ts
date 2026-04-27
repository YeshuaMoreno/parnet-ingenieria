import { Routes } from '@angular/router';
import { authGuard } from './guards/auth-guard';

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
    path: '**',
    redirectTo: ''
  }
];