// src/app/features/registro/registro.component.ts
import { Component, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import { AuthService } from '../../core/services/auth.service';

@Component({
  selector: 'app-registro',
  standalone: true,
  imports: [CommonModule, FormsModule, RouterLink],
  template: `
    <div class="container mt-5" style="max-width:500px">
      <div class="card shadow">
        <div class="card-body">
          <h3 class="text-center mb-3">Crear cuenta</h3>

          <div *ngIf="error()" class="alert alert-danger">{{ error() }}</div>

          <div class="mb-3">
            <label class="form-label">Nombre</label>
            <input type="text" class="form-control" [(ngModel)]="nombre" required>
          </div>

          <div class="mb-3">
            <label class="form-label">Email</label>
            <input type="email" class="form-control" [(ngModel)]="email" required>
          </div>

          <div class="mb-3">
            <label class="form-label">Contraseña (mínimo 8 caracteres)</label>
            <input type="password" class="form-control" [(ngModel)]="password" required minlength="8">
          </div>

          <button class="btn btn-success w-100" (click)="registrar()" [disabled]="loading()">
            {{ loading() ? 'Registrando...' : 'Registrarse' }}
          </button>

          <div class="text-center mt-3">
            <a routerLink="/">Volver</a>
          </div>
        </div>
      </div>
    </div>
  `
})
export class RegistroComponent {
  nombre = '';
  email = '';
  password = '';
  error = signal('');
  loading = signal(false);

  constructor(private auth: AuthService, private router: Router) {}

  registrar() {
    if (this.password.length < 8) {
      this.error.set('La contraseña debe tener al menos 8 caracteres');
      return;
    }
    this.error.set('');
    this.loading.set(true);
    this.auth.registro(this.nombre, this.email, this.password).subscribe({
      next: () => this.router.navigate(['/login']),
      error: (err) => {
        this.error.set(err.error?.error || 'Error al registrar');
        this.loading.set(false);
      }
    });
  }
}
