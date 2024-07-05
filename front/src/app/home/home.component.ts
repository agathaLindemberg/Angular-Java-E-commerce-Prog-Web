import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { CategoriaService } from '../services/categoria.service';
import { Categoria } from '../model/categoria.model';
import { ProdutoService } from '../services/produto.service';
import { Produto } from '../model/produto.model';
import { FiltroService } from '../services/filtro.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

  categorias: Categoria[] = [];
  produtos: Produto[] = [];
  produtosFiltrados: Produto[] = [];
  categoriaSelecionada: Categoria | null = null;

  constructor(
    private router: Router,
    private categoriaService: CategoriaService,
    private produtoService: ProdutoService,
    private filtroService: FiltroService
  ) { }

  ngOnInit(): void {
    this.getCategorias();
    this.getProdutos();

    this.filtroService.categoriaSelecionada$.subscribe(categoria => {
      this.categoriaSelecionada = categoria;
      if (categoria) {
        this.produtosFiltrados = this.produtos.filter(produto => produto.categoria.id === categoria.id);
      } else {
        this.produtosFiltrados = this.produtos;
      }
    });
  }

  getCategorias(): void {
    this.categoriaService.getCategorias().subscribe(
      data => {
        this.categorias = data;
      },
      error => {
        console.error('Erro ao obter categorias', error);
      });
  }

  getProdutos(): void {
    this.produtoService.getProdutos().subscribe(
      data => {
        this.produtos = data;
        this.produtosFiltrados = data;
      },
      error => {
        console.error('Erro ao obter produtos', error);
      });
  }

  filterByCategory(categoria: Categoria): void {
    this.filtroService.setSelectedCategory(categoria);
  }

  seeDetails(id: number): void {
    this.router.navigate(['/detalhes-produto', id]);
  }
}
