import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({ providedIn: 'root' })
export class ContactoService {
  private api = 'https://backend-essenciafit.onrender.com/api/contacto';
  constructor(private http: HttpClient) {}
  enviar(data: { nombre: string; email: string; asunto: string; mensaje: string }) {
    return this.http.post(this.api, data);
  }
}