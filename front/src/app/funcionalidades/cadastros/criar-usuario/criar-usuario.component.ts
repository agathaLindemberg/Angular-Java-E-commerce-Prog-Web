import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { UsuarioService } from 'src/app/services/usuario.service';
import { Usuario } from 'src/app/model/usuario.model';

@Component({
  selector: 'app-criar-usuario',
  templateUrl: './criar-usuario.component.html',
  styleUrls: ['./criar-usuario.component.scss']
})
export class CriarUsuarioComponent {

  constructor(private usuarioService: UsuarioService, private router: Router) { }

  onSubmit(cadastroForm: any) {
    const { nome, endereco, email, login, senha } = cadastroForm.value;
    const usuario: Usuario = { nome, endereco, email, login, senha, administrador: false };

    this.usuarioService.save(usuario).subscribe(
      success => {
        if (success) {
          this.router.navigate(['/login']);
        } else {
          alert('Erro ao tentar cadastrar');
        }
      },
      error => {
        alert('Erro ao tentar cadastrar');
      }
    );
  }
}
