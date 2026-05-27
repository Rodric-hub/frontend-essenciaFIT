// src/app/features/home/home.component.ts
import { Component, OnInit, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';
import { ProductoService } from '../../core/services/producto.service';
import { CarritoService } from '../../core/services/carrito.service';
import { AuthService } from '../../core/services/auth.service';
import { Producto } from '../../core/models/models';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [CommonModule, RouterLink],
  templateUrl: './home.component.html'
})
export class HomeComponent implements OnInit {
  productos = signal<Producto[]>([]);
  msgExito = signal('');

  constructor(
    private productoService: ProductoService,
    private carritoService: CarritoService,
    public auth: AuthService
  ) {}

  ngOnInit() {
    this.productoService.getTop8().subscribe(p => this.productos.set(p));
  }

  agregarAlCarrito(productoId: number) {
    this.carritoService.agregar(productoId).subscribe({
      next: () => {
        this.msgExito.set('Producto añadido al carrito ✔');
        setTimeout(() => this.msgExito.set(''), 3000);
      },
      error: () => this.msgExito.set('Error al agregar producto')
    });
  }
}
