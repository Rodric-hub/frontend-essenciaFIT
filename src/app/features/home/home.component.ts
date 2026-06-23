// src/app/features/home/home.component.ts
import { Component, OnInit, OnDestroy, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router, RouterLink } from '@angular/router';
import { ProductoService } from '../../core/services/producto.service';
import { CarritoService } from '../../core/services/carrito.service';
import { AuthService } from '../../core/services/auth.service';
import { Producto } from '../../core/models/models';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [CommonModule, RouterLink],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})
export class HomeComponent implements OnInit, OnDestroy {
  productos = signal<Producto[]>([]);
  msgExito = signal('');

  // Carrusel promocional
  promoImages = ['/img/promo1.jpg', '/img/promo2.jpg', '/img/promo3.jpg'];
  currentSlide = 0;
  private autoplayInterval?: ReturnType<typeof setInterval>;

  constructor(
    private productoService: ProductoService,
    private carritoService: CarritoService,
    private router: Router,
    public auth: AuthService
  ) {}

  ngOnInit() {
    this.productoService.getTop8().subscribe(p => this.productos.set(p));
    this.startAutoplay();
  }

  ngOnDestroy() {
    clearInterval(this.autoplayInterval);
  }

  startAutoplay() {
    this.autoplayInterval = setInterval(() => this.nextSlide(), 5000);
  }

  resetAutoplay() {
    clearInterval(this.autoplayInterval);
    this.startAutoplay();
  }

  nextSlide() {
    this.currentSlide = (this.currentSlide + 1) % this.promoImages.length;
  }

  prevSlide() {
    this.currentSlide =
      (this.currentSlide - 1 + this.promoImages.length) % this.promoImages.length;
    this.resetAutoplay();
  }

  goToSlide(i: number) {
    this.currentSlide = i;
    this.resetAutoplay();
  }

  irAProductos() {
    this.router.navigate(['/productos']);
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