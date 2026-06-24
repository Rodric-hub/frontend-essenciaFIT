import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Categoria } from '../models/models';

@Injectable({ providedIn: 'root' })
export class CategoriaService {

private api = 'https://backend-essenciafit.onrender.com/api/categorias';

constructor(private http: HttpClient) {}

getAll() {
  return this.http.get<Categoria[]>(this.api);
}

}