import { Produto } from "./produto.model";

export interface VendaProduto {
  quantidade: number;
  produto: Produto;
}