// src/app/app.routes.ts
import { Routes } from '@angular/router';
import { authGuard } from './app/core/guards/auth.guard';

export const routes: Routes = [
  {
    path: '',
    loadComponent: () => import('./app/features/home/home.component').then(m => m.HomeComponent)
  },
  {
    path: 'productos',
    loadComponent: () => import('./app/features/productos/productos.component').then(m => m.ProductosComponent)
  },
  {
    path: 'productos/categoria/:id',
    loadComponent: () => import('./app/features/productos/productos.component').then(m => m.ProductosComponent)
  },
  {
    path: 'carrito',
    loadComponent: () => import('./app//features/carrito/carrito.component').then(m => m.CarritoComponent),
    canActivate: [authGuard]
  },
  {
    path: 'contacto',
    loadComponent: () => import('./app/features/contacto/contacto.component').then(m => m.ContactoComponent)
  },
  {
    path: 'login',
    loadComponent: () => import('./app/features/login/login.component').then(m => m.LoginComponent)
  },
  {
    path: 'registro',
    loadComponent: () => import('./app/features/registro/registro.component').then(m => m.RegistroComponent)
  },
  {
    path: '**',
    redirectTo: ''
  }
];
