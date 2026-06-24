import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Producto } from '../models/models';

@Injectable({ providedIn: 'root' })
export class ProductoService {

private api = 'https://backend-essenciafit.onrender.com/api';

constructor(private http: HttpClient) {}

getAll() {
  return this.http.get<Producto[]>(`${this.api}/productos`);
}

getPorId(id: number) {
  return this.http.get<Producto>(`${this.api}/productos/${id}`);
}

getTop8() {
  return this.http.get<Producto[]>(`${this.api}/productos/top`);
}

getPorCategoria(id: number) {
  return this.http.get<Producto[]>(`${this.api}/productos/categoria/${id}`);
}

}