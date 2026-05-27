// src/app/features/login/login.component.ts
import { Component, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import { AuthService } from '../../core/services/auth.service';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [CommonModule, FormsModule, RouterLink],
  template: `
    <div class="container" style="padding-top:80px; max-width:420px;">
      <div class="card shadow">
        <div class="card-body">
          <h4 class="card-title mb-3 text-center">Iniciar sesión</h4>

          <div *ngIf="error()" class="alert alert-danger">{{ error() }}</div>
          <div *ngIf="successMsg()" class="alert alert-success">{{ successMsg() }}</div>

          <div class="mb-3">
            <label class="form-label">Email</label>
            <input type="email" class="form-control" [(ngModel)]="email" required>
          </div>

          <div class="mb-3">
            <label class="form-label">Contraseña</label>
            <input type="password" class="form-control" [(ngModel)]="password" required>
          </div>

          <button class="btn btn-success w-100" (click)="login()" [disabled]="loading()">
            {{ loading() ? 'Ingresando...' : 'Ingresar' }}
          </button>

          <div class="mt-3 text-center">
            ¿No tienes cuenta? <a routerLink="/registro">Regístrate</a>
          </div>
        </div>
      </div>
    </div>
  `
})
export class LoginComponent {
  email = '';
  password = '';
  error = signal('');
  successMsg = signal('');
  loading = signal(false);

  constructor(private auth: AuthService, private router: Router) {}

  login() {
    this.error.set('');
    this.loading.set(true);
    this.auth.login(this.email, this.password).subscribe({
      next: () => this.router.navigate(['/']),
      error: () => {
        this.error.set('Email o contraseña incorrectos');
        this.loading.set(false);
      }
    });
  }
}
