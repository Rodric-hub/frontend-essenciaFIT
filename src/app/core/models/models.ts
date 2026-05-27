// src/app/core/models/models.ts

export interface Categoria {
  id: number;
  nombre: string;
}

export interface Producto {
  id: number;
  nombre: string;
  descripcion: string;
  precio: number;
  stock: number;
  imagenUrl: string;
  categoria: Categoria;
}

export interface CarritoItem {
  id: number;
  producto: Producto;
  cantidad: number;
}

export interface CarritoResponse {
  items: CarritoItem[];
  total: number;
}

export interface Usuario {
  nombre: string;
  email: string;
  rol: string;
}

export interface LoginResponse {
  token: string;
  nombre: string;
  email: string;
  rol: string;
}

export interface Pedido {
  id: number;
  total: number;
  fecha: string;
}
