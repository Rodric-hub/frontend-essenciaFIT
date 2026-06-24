// src/app/features/contacto/contacto.component.ts
import { Component, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ContactoService } from '../../core/services/contacto.service';
import { FooterComponent } from '../../shared/footer/footer.component';
import { RouterLink } from '@angular/router';


@Component({
  selector: 'app-contacto',
  standalone: true,
  imports: [CommonModule, FormsModule, RouterLink, FooterComponent],
  template: `
    <!-- TÍTULO -->
    <section class="py-5 bg-light">
      <div class="container text-center">
        <h2 class="fw-bold">Contáctanos</h2>
        <p class="text-muted">Estamos aquí para ayudarte con tus compras y consultas.</p>
      </div>
    </section>

    <!-- FORMULARIO -->
    <div class="container py-4" style="max-width: 650px">
      <div *ngIf="msgExito()" class="alert alert-success text-center">{{ msgExito() }}</div>
      <div *ngIf="msgError()" class="alert alert-danger text-center">{{ msgError() }}</div>

      <div class="card shadow-lg border-0">
        <div class="card-body p-4">
          <h4 class="mb-3 text-center">Escríbenos</h4>

          <div class="mb-3">
            <label class="form-label">Nombre completo</label>
            <input type="text" class="form-control" [(ngModel)]="nombre" required>
          </div>

          <div class="mb-3">
            <label class="form-label">Correo electrónico</label>
            <input type="email" class="form-control" [(ngModel)]="email" required>
          </div>

          <div class="mb-3">
            <label class="form-label">Asunto</label>
            <input type="text" class="form-control" [(ngModel)]="asunto" required>
          </div>

          <div class="mb-3">
            <label class="form-label">Mensaje</label>
            <textarea class="form-control" [(ngModel)]="mensaje" rows="4" required></textarea>
          </div>

          <button class="btn btn-success w-100" (click)="enviar()" [disabled]="loading()">
            {{ loading() ? 'Enviando...' : 'Enviar mensaje' }}
          </button>
        </div>
      </div>
    </div>

    <!-- FOOTER -->
    <app-footer></app-footer>
  `
})
export class ContactoComponent {
  nombre = '';
  email = '';
  asunto = '';
  mensaje = '';
  msgExito = signal('');
  msgError = signal('');
  loading = signal(false);

  constructor(private contactoService: ContactoService) {}

  enviar() {
    this.msgExito.set('');
    this.msgError.set('');
    this.loading.set(true);

    this.contactoService.enviar({
      nombre: this.nombre,
      email: this.email,
      asunto: this.asunto,
      mensaje: this.mensaje
    }).subscribe({
      next: () => {
        this.msgExito.set('¡Tu mensaje fue enviado correctamente!');
        this.nombre = this.email = this.asunto = this.mensaje = '';
        this.loading.set(false);
      },
      error: () => {
        this.msgError.set('Error al enviar el mensaje. Intenta nuevamente.');
        this.loading.set(false);
      }
    });
  }
}
