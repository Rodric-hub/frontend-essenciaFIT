// src/app/shared/navbar/navbar.component.ts
import { Component, OnInit, signal, HostListener } from '@angular/core';
import { RouterLink, RouterLinkActive, Router, NavigationEnd } from '@angular/router';
import { CommonModule } from '@angular/common';
import { AuthService } from '../../core/services/auth.service';
import { CategoriaService } from '../../core/services/categoria.service';
import { Categoria } from '../../core/models/models';

@Component({
  selector: 'app-navbar',
  standalone: true,
  imports: [CommonModule, RouterLink, RouterLinkActive],
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.css'
})
export class NavbarComponent implements OnInit {
  categorias = signal<Categoria[]>([]);
  isHome = signal(true);
  isScrolled = signal(false);

  constructor(
    public auth: AuthService,
    private categoriaService: CategoriaService,
    private router: Router
  ) {}

  ngOnInit() {
    this.categoriaService.getAll().subscribe(cats => this.categorias.set(cats));

    this.isHome.set(this.router.url === '/');

    this.router.events.subscribe(event => {
      if (event instanceof NavigationEnd) {
        this.isHome.set(event.url === '/');
      }
    });
  }

  @HostListener('window:scroll')
  onScroll() {
    this.isScrolled.set(window.scrollY > 50);
  }

  logout() {
    this.auth.logout();
  }
}