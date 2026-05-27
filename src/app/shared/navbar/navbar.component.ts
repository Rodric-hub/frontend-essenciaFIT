// src/app/shared/navbar/navbar.component.ts
import { Component, OnInit, signal } from '@angular/core';
import { RouterLink, RouterLinkActive } from '@angular/router';
import { CommonModule } from '@angular/common';
import { AuthService } from '../../core/services/auth.service';
import { CategoriaService } from '../../core/services/categoria.service';
import { Categoria } from '../../core/models/models';

@Component({
  selector: 'app-navbar',
  standalone: true,
  imports: [CommonModule, RouterLink, RouterLinkActive],
  templateUrl: './navbar.component.html'
})
export class NavbarComponent implements OnInit {
  categorias = signal<Categoria[]>([]);

  constructor(
    public auth: AuthService,
    private categoriaService: CategoriaService
  ) {}

  ngOnInit() {
    this.categoriaService.getAll().subscribe(cats => this.categorias.set(cats));
  }

  logout() {
    this.auth.logout();
  }
}
