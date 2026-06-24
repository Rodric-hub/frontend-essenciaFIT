// src/app/features/carrito/carrito.component.ts
import { Component, OnInit, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';
import { CarritoService } from '../../core/services/carrito.service';
import { CarritoItem } from '../../core/models/models';
import { CarritoResponse } from '../../core/models/models';

@Component({
  selector: 'app-carrito',
  standalone: true,
  imports: [CommonModule, RouterLink],
  templateUrl: './carrito.component.html'
})
export class CarritoComponent implements OnInit {
  items = signal<CarritoItem[]>([]);
  total = signal(0);
  msgExito = signal('');
  msgError = signal('');
  showModal = signal(false);

  constructor(private carritoService: CarritoService) {}

  ngOnInit() {
    this.cargar();
  }

  cargar() {
    this.carritoService.getCarrito().subscribe((res: CarritoResponse) => {
      this.items.set(res.items);
      this.total.set(res.total);
    });
  }

  eliminar(itemId: number) {
    this.carritoService.eliminar(itemId).subscribe(() => this.cargar());
  }

  finalizar() {
    this.carritoService.finalizar().subscribe({
      next: () => {
        this.items.set([]);
        this.total.set(0);
        this.showModal.set(true);
      },
      error: (err) => {
        this.msgError.set(err.error?.error || 'Error al procesar la compra');
      }
    });
  }

  cerrarModal() {
    this.showModal.set(false);
  }
}
