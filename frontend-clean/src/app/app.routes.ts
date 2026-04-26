import { Routes } from '@angular/router';


export const routes: Routes = [
    {
        path: 'login',
        loadComponent: () =>
            import('./login/login.component').then(m => m.LoginComponent)
    },
    {
        path: '',
        redirectTo: 'login',
        pathMatch: 'full'
    },
    {
        path: 'dashboard',
        loadComponent: () =>
            import('./dashboard/dashboard.component').then(m => m.DashboardComponent)
    },
    {
        path: 'admin-productos',
        loadComponent: () =>
            import('./admin-productos/admin-productos.component').then(m => m.AdminProductosComponent)
    },
    {
    path: 'sugerencias',
    loadComponent: () =>
        import('./sugerencias/sugerencias.component').then(m => m.SugerenciasComponent)
    },
    {
    path: 'admin-sugerencias',
    loadComponent: () =>
        import('./admin-sugerencias/admin-sugerencias.component').then(m => m.AdminSugerenciasComponent)
    }
];