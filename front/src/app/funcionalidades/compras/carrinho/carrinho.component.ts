import { Component, OnInit } from '@angular/core';
import { CarrinhoService } from 'src/app/services/carrinho.service';
import { Produto } from 'src/app/model/produto.model';
import { VendaService } from 'src/app/services/venda.service';
import { Venda } from 'src/app/model/venda.model';
import { UsuarioService } from 'src/app/services/usuario.service';

@Component({
  selector: 'app-carrinho',
  templateUrl: './carrinho.component.html',
  styleUrls: ['./carrinho.component.scss']
})
export class CarrinhoComponent implements OnInit {

  itensCarrinho: {
    produto: Produto,
    quantidade: number,
    selecionado: boolean
  }[] = [];
  subtotal: number = 0;

  constructor(
    private carrinhoService: CarrinhoService,
    private vendaService: VendaService,
    private usuarioService: UsuarioService,
  ) { }

  ngOnInit(): void {
    this.itensCarrinho = this.carrinhoService.getItemsCart().map(item => ({ ...item, selecionado: false }));
    this.calculateSubtotal();
  }

  updateQuantity(produto: Produto, quantidade: number): void {
    this.carrinhoService.updateQuantity(produto, quantidade);
    this.calculateSubtotal();
  }

  removeFromCart(produto: Produto): void {
    this.carrinhoService.removeFromCart(produto);
    this.itensCarrinho = this.carrinhoService.getItemsCart().map(item => ({ ...item, selecionado: false }));
    this.calculateSubtotal();
  }

  calculateSubtotal(): void {
    this.subtotal = this.itensCarrinho
      .filter(item => item.selecionado)
      .reduce((total, item) => total + item.produto.preco * item.quantidade, 0);
  }

  closeOrder(): void {
    const itensSelecionados = this.itensCarrinho.filter(item => item.selecionado);
    if (itensSelecionados.length > 0) {
      const venda: Venda = {
        dataHora: new Date(),
        usuario: this.usuarioService.getUsuario(),
        itens: itensSelecionados.map(item => ({
          quantidade: item.quantidade,
          produto: item.produto
        }))
      };

      this.vendaService.save(venda).subscribe(() => {
        alert('Venda salva com sucesso');
        this.itensCarrinho = [];
        this.subtotal = 0;
      }, () => {
        alert('Erro ao salvar a venda');
      });
    } else {
      alert('Nenhum item selecionado para a venda');
    }
  }
}
