import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, Router } from '@angular/router';
import { ProductoService } from '../../core/services/producto.service';
import { CarritoService } from '../../core/services/carrito.service';
import { Producto } from '../../core/models/models';
import { AuthService } from '../../core/services/auth.service';


@Component({
  selector: 'app-producto-detalle',
  standalone: true,
  imports: [CommonModule],
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

          next: (data) => {

            this.producto = data;

            this.cd.detectChanges(); 

          },

          error: (err) => {
            console.error(err);
          }

        });

    });

  }

  agregarCarrito(){

  if(!this.auth.isLoggedIn()){
    this.router.navigate(['/login']);
    return;
  }


  if(this.producto){

            this.carritoService
            .agregar(this.producto.id)
            .subscribe({

                    next: () => {

                        this.mensaje = '✅ Producto agregado al carrito';

                        this.cd.detectChanges();

                        setTimeout(() => {

                            this.mensaje = '';

                            this.cd.detectChanges();

                        }, 3000);

                    },

                    error: () => {

                        this.mensaje = '❌ Error al agregar producto';

                        this.cd.detectChanges();

                        setTimeout(() => {

                            this.mensaje = '';

                            this.cd.detectChanges();

                        }, 3000);

                    }

                }
            );

        }

    }

}
