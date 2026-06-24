// src/app/features/productos/productos.component.ts
import { Component, OnInit, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink, ActivatedRoute } from '@angular/router';
import { ProductoService } from '../../core/services/producto.service';
import { CategoriaService } from '../../core/services/categoria.service';
import { CarritoService } from '../../core/services/carrito.service';
import { AuthService } from '../../core/services/auth.service';
import { Producto, Categoria } from '../../core/models/models';
import { FooterComponent } from '../../shared/footer/footer.component';

@Component({
  selector: 'app-productos',
  standalone: true,
   imports: [CommonModule, RouterLink, FooterComponent],
  templateUrl: './productos.component.html'
})
export class ProductosComponent implements OnInit {
  productos = signal<Producto[]>([]);
  categorias = signal<Categoria[]>([]);
  msgExito = signal('');

  constructor(
    private productoService: ProductoService,
    private categoriaService: CategoriaService,
    private carritoService: CarritoService,
    private route: ActivatedRoute,
    public auth: AuthService
  ) {}

  ngOnInit() {
    this.categoriaService.getAll().subscribe(c => this.categorias.set(c));

    this.route.params.subscribe(params => {
      if (params['id']) {
        this.productoService.getPorCategoria(+params['id'])
          .subscribe(p => this.productos.set(p));
      } else {
        this.productoService.getAll()
          .subscribe(p => this.productos.set(p));
      }
    });
  }

  agregarAlCarrito(productoId: number) {
    this.carritoService.agregar(productoId).subscribe({
      next: () => {
        this.msgExito.set('Producto añadido ✔');
        setTimeout(() => this.msgExito.set(''), 3000);
      }
    });
  }
}
