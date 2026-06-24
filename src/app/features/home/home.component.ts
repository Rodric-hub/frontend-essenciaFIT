// src/app/features/home/home.component.ts
import { FooterComponent } from '../../shared/footer/footer.component';
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
   imports: [CommonModule, RouterLink, FooterComponent],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})
export class HomeComponent implements OnInit, OnDestroy {

  productos = signal<Producto[]>([]);
  msgExito = signal('');

  // Productos por categoría
  proteinas = signal<Producto[]>([]);
  creatinas = signal<Producto[]>([]);
  bolsas = signal<Producto[]>([]);
  preEntrenos = signal<Producto[]>([]);
  precursores = signal<Producto[]>([]);

  // Paginación de carruseles de categorías
  private categoriaPages: Record<string, number> = {
    proteinas: 0,
    creatinas: 0,
    bolsas: 0,
    preEntrenos: 0,
    precursores: 0,
  };

  readonly ITEMS_PER_PAGE = 4;

  getPagina(categoria: string, lista: Producto[]): Producto[] {
    const page = this.categoriaPages[categoria] || 0;
    const start = page * this.ITEMS_PER_PAGE;
    return lista.slice(start, start + this.ITEMS_PER_PAGE);
  }

  getTotalPaginas(lista: Producto[]): number {
    return Math.ceil(lista.length / this.ITEMS_PER_PAGE);
  }

  prevCategoria(categoria: string) {
    this.categoriaPages[categoria] = Math.max(
      (this.categoriaPages[categoria] || 0) - 1,
      0
    );
  }

  nextCategoria(categoria: string, lista: Producto[]) {
    const total = this.getTotalPaginas(lista);
    this.categoriaPages[categoria] = Math.min(
      (this.categoriaPages[categoria] || 0) + 1,
      total - 1
    );
  }

  getPaginaActual(categoria: string): number {
    return this.categoriaPages[categoria] || 0;
  }

  // Carrusel promocional
  promoImages = ['/img/promo1.jpg', '/img/promo2.jpg', '/img/promo3.jpg'];
  currentSlide = 0;
  private autoplayInterval?: ReturnType<typeof setInterval>;

  brands = [
    { name: 'Dymatize', logo: '/img/brands/dymatize.png' },
    { name: 'Optimum Nutrition', logo: '/img/brands/optimum-nutrition.png' },
    { name: 'MuscleTech', logo: '/img/brands/muscletech.png' },
    { name: 'MyProtein', logo: '/img/brands/myprotein.png' },
    { name: 'BSN', logo: '/img/brands/bsn.png' },
    { name: 'Universal Nutrition', logo: '/img/brands/universal-nutrition.png' },
  ];

  constructor(
    private productoService: ProductoService,
    private carritoService: CarritoService,
    private router: Router,
    public auth: AuthService
  ) {}

  ngOnInit() {
    this.productoService.getTop8().subscribe(p => this.productos.set(p));

    this.productoService.getPorCategoria(1).subscribe(p => this.proteinas.set(p));
    this.productoService.getPorCategoria(2).subscribe(p => this.creatinas.set(p));
    this.productoService.getPorCategoria(3).subscribe(p => this.bolsas.set(p));
    this.productoService.getPorCategoria(4).subscribe(p => this.preEntrenos.set(p));
    this.productoService.getPorCategoria(5).subscribe(p => this.precursores.set(p));

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
      (this.currentSlide - 1 + this.promoImages.length) %
      this.promoImages.length;
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