import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HomeComponent } from './home/home.component';
import { LoginComponent } from './funcionalidades/login/login.component';
import { MatIconModule } from '@angular/material/icon';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CriarUsuarioComponent } from './funcionalidades/cadastros/criar-usuario/criar-usuario.component';
import { CriarEditarProdutoComponent } from './funcionalidades/cadastros/criar-editar-produto/criar-editar-produto.component';
import { CriarEditarCategoriaComponent } from './funcionalidades/cadastros/criar-editar-categoria/criar-editar-categoria.component';
import { CommonModule } from '@angular/common';
import { DetalhesProdutoComponent } from './funcionalidades/compras/detalhes-produto/detalhes-produto.component';
import { CarrinhoComponent } from './funcionalidades/compras/carrinho/carrinho.component';
import { PaginaUsuarioComponent } from './funcionalidades/pagina-usuario/pagina-usuario.component';
import { ToastrModule } from 'ngx-toastr';

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    LoginComponent,
    CriarUsuarioComponent,
    CriarEditarProdutoComponent,
    CriarEditarCategoriaComponent,
    DetalhesProdutoComponent,
    CarrinhoComponent,
    PaginaUsuarioComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    MatIconModule,
    CommonModule,
    HttpClientModule,
    ReactiveFormsModule,
    BrowserAnimationsModule,
    FormsModule,
    ToastrModule.forRoot()
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
