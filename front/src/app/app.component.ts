import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { FiltroService } from './services/filtro.service';
import { UsuarioService } from './services/usuario.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  constructor(
    private router: Router,
    private filtroService: FiltroService,
    private usuarioService: UsuarioService,
  ) { }

  navigateToLoginOrProfile() {
    if (this.usuarioService.isLoggedIn()) {
      const usuario = this.usuarioService.getUsuario();

      if (usuario !== null) {
        this.router.navigate([`/pagina/usuario/${usuario.id}`]);
      }
    } else {
      this.router.navigate(['/login']);
    }
  }

  navigateToCart() {
    this.router.navigate(['/carrinho']);
  }

  navigateToHome() {
    this.router.navigate(['/home']);
  }

  clearFilter(): void {
    this.filtroService.clearFilter();
  }
}
