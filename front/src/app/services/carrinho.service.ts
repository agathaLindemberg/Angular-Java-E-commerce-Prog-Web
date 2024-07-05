import { Injectable } from '@angular/core';
import { Produto } from '../model/produto.model';

@Injectable({
  providedIn: 'root'
})
export class CarrinhoService {
  private itens: { produto: Produto, quantidade: number }[] = [];

  addToCart(produto: Produto, quantidade: number): void {
    const itemExistente = this.itens.find(item => item.produto.id === produto.id);
    if (itemExistente) {
      itemExistente.quantidade += quantidade;
    } else {
      this.itens.push({ produto, quantidade });
    }
  }

  updateQuantity(produto: Produto, quantidade: number): void {
    const item = this.itens.find(item => item.produto.id === produto.id);
    if (item) {
      item.quantidade = quantidade;
    }
  }

  removeFromCart(produto: Produto): void {
    this.itens = this.itens.filter(item => item.produto.id !== produto.id);
  }

  getItemsCart(): { produto: Produto, quantidade: number }[] {
    return this.itens;
  }
}
