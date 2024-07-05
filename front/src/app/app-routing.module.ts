import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { LoginComponent } from './funcionalidades/login/login.component';
import { CriarUsuarioComponent } from './funcionalidades/cadastros/criar-usuario/criar-usuario.component';
import { CriarEditarProdutoComponent } from './funcionalidades/cadastros/criar-editar-produto/criar-editar-produto.component';
import { CriarEditarCategoriaComponent } from './funcionalidades/cadastros/criar-editar-categoria/criar-editar-categoria.component';
import { DetalhesProdutoComponent } from './funcionalidades/compras/detalhes-produto/detalhes-produto.component';
import { CarrinhoComponent } from './funcionalidades/compras/carrinho/carrinho.component';
import { PaginaUsuarioComponent } from './funcionalidades/pagina-usuario/pagina-usuario.component';

const routes: Routes = [
  { path: '', component: HomeComponent },
  { path: 'login', component: LoginComponent },
  { path: 'home', component: HomeComponent },
  { path: 'cadastro', component: CriarUsuarioComponent },
  { path: 'produtos/cadastrar', component: CriarEditarProdutoComponent },
  { path: 'produtos/editar/:id', component: CriarEditarProdutoComponent },
  { path: 'categorias/cadastrar', component: CriarEditarCategoriaComponent },
  { path: 'categorias/editar/:id', component: CriarEditarCategoriaComponent },
  { path: 'detalhes-produto/:id', component: DetalhesProdutoComponent },
  { path: 'carrinho', component: CarrinhoComponent },
  { path: 'pagina/usuario/:id', component: PaginaUsuarioComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
