// src/app/core/services/auth.service.ts
import { Injectable, signal } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { tap } from 'rxjs/operators';
import { LoginResponse, Usuario } from '../models/models';

@Injectable({ providedIn: 'root' })
export class AuthService {
  private apiUrl = 'https://backend-essenciafit.onrender.com/api/auth';

  // Signals reactivos
  currentUser = signal<Usuario | null>(this.loadUser());

  constructor(private http: HttpClient, private router: Router) {}

  login(email: string, password: string) {
    return this.http.post<LoginResponse>(`${this.apiUrl}/login`, { email, password })
      .pipe(tap(res => {
        localStorage.setItem('token', res.token);
        const user: Usuario = { nombre: res.nombre, email: res.email, rol: res.rol };
        localStorage.setItem('user', JSON.stringify(user));
        this.currentUser.set(user);
      }));
  }

  registro(nombre: string, email: string, password: string) {
    return this.http.post(`${this.apiUrl}/registro`, { nombre, email, password });
  }

  logout() {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    this.currentUser.set(null);
    this.router.navigate(['/']);
  }

  getToken(): string | null {
    return localStorage.getItem('token');
  }

  isLoggedIn(): boolean {
    return !!this.getToken();
  }

  private loadUser(): Usuario | null {
    const u = localStorage.getItem('user');
    return u ? JSON.parse(u) : null;
  }
}
