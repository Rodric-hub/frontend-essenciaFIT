import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute } from '@angular/router';
import { ProductoService } from '../../core/services/producto.service';
import { CarritoService } from '../../core/services/carrito.service';
import { Producto } from '../../core/models/models';

@Component({
  selector: 'app-producto-detalle',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './producto-detalle.component.html'
})
export class ProductoDetalleComponent implements OnInit {

  producto: Producto | null = null;

  constructor(
    private route: ActivatedRoute,
    private productoService: ProductoService,
    private carritoService: CarritoService,
    private cd: ChangeDetectorRef
  ) {}


  ngOnInit() {

    this.route.paramMap.subscribe(params => {

      const id = Number(params.get('id'));

      console.log("ID:", id);

      this.productoService.getPorId(id)
        .subscribe({

          next: (data) => {

            console.log("Producto cargado:", data);

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

    if(this.producto){

      this.carritoService
      .agregar(this.producto.id)
      .subscribe();

    }

  }

}
