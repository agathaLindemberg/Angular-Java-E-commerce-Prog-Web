import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ProdutoService } from 'src/app/services/produto.service';
import { CarrinhoService } from 'src/app/services/carrinho.service';
import { Produto } from 'src/app/model/produto.model';

@Component({
  selector: 'app-detalhes-produto',
  templateUrl: './detalhes-produto.component.html',
  styleUrls: ['./detalhes-produto.component.scss']
})
export class DetalhesProdutoComponent implements OnInit {

  produto: Produto;
  quantidade: number = 1;

  constructor(
    private route: ActivatedRoute,
    private produtoService: ProdutoService,
    private carrinhoService: CarrinhoService,
  ) { }

  ngOnInit(): void {
    this.getDetailsProduct();
  }

  getDetailsProduct(): void {
    const id = +this.route.snapshot.paramMap.get('id');
    this.produtoService.getProduto(id).subscribe(
      produto => {
        this.produto = produto;
      },
      error => {
        console.error('Erro ao obter detalhes do produto', error);
      }
    );
  }

  addToCart(): void {
    this.carrinhoService.addToCart(this.produto, this.quantidade);
    alert("Produto inserido ao carrinho com sucesso!")
  }
}
