import { Categoria } from "./categoria.model";

export interface Produto {
  id: number;
  nome: string;
  descricao: string;
  autor: string;
  preco: number;
  foto: string;
  tamanho: number;
  quantidade: number;
  categoria: Categoria;
}