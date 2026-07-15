import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { ProductoService } from '../../core/services/producto.service';
import { CarritoService } from '../../core/services/carrito.service';
import { Producto } from '../../core/models/models';
import { AuthService } from '../../core/services/auth.service';
import { FooterComponent } from '../../shared/footer/footer.component';

@Component({
  selector: 'app-producto-detalle',
  standalone: true,
  imports: [
    CommonModule,
    FooterComponent,
    RouterLink
  ],
  templateUrl: './producto-detalle.component.html'
})
export class ProductoDetalleComponent implements OnInit {

  producto: Producto | null = null;
  mensaje = '';

  constructor(
    private route: ActivatedRoute,
    private productoService: ProductoService,
    private carritoService: CarritoService,
    private cd: ChangeDetectorRef,
    private router: Router,
    public auth: AuthService
  ) {}

  ngOnInit() {

    this.route.paramMap.subscribe(params => {

      const id = Number(params.get('id'));

      this.productoService.getPorId(id)
        .subscribe({

          next: (data: Producto) => {

            this.producto = data;

            this.cd.detectChanges();

          },

          error: (err) => {
            console.error(err);
          }

        });

    });

  }


  agregarCarrito() {

    if (!this.auth.isLoggedIn()) {
      this.router.navigate(['/login']);
      return;
    }

    if (this.producto) {

      this.carritoService
        .agregar(this.producto.id)
        .subscribe({

          next: () => {

            const modalElement = document.getElementById('productoAgregadoModal');

            if (modalElement) {

              modalElement.classList.add('show');
              modalElement.style.display = 'block';
              modalElement.removeAttribute('aria-hidden');

            }

          },

          error: (err) => {

            console.error('Error al agregar producto', err);

          }

        });

    }

  }


  cerrarModal() {

    const modalElement = document.getElementById('productoAgregadoModal');

    if (modalElement) {

      modalElement.classList.remove('show');
      modalElement.style.display = 'none';
      modalElement.setAttribute('aria-hidden', 'true');

    }

  }

}
