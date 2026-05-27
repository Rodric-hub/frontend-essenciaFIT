import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { CarritoResponse } from '../models/models';

@Injectable({ providedIn: 'root' })
export class CarritoService {
  private api = 'http://localhost:8081/api/carrito';
  constructor(private http: HttpClient) {}
  getCarrito() { return this.http.get<CarritoResponse>(this.api); }
  agregar(productoId: number, cantidad = 1) { return this.http.post(this.api + '/agregar', { productoId, cantidad }); }
  eliminar(itemId: number) { return this.http.delete(`${this.api}/${itemId}`); }
  finalizar() { return this.http.post('http://localhost:8081/api/pedidos/finalizar', {}); }
}