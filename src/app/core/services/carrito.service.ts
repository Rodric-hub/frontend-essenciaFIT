import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({ providedIn: 'root' })
export class CarritoService {

private api = 'https://backend-essenciafit.onrender.com/api/carrito';

constructor(private http: HttpClient) {}

getCarrito() {
  return this.http.get(this.api);
}

agregar(productoId: number, cantidad = 1) {
  return this.http.post(`${this.api}/agregar`, { productoId, cantidad });
}

eliminar(itemId: number) {
  return this.http.delete(`${this.api}/${itemId}`);
}

finalizar() {
  return this.http.post('https://backend-essenciafit.onrender.com/api/pedidos/finalizar', {});
}

}