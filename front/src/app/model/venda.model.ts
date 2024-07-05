import { Usuario } from "./usuario.model";
import { VendaProduto } from "./vendaproduto.model";

export interface Venda {
  id?: number;
  dataHora: Date;
  usuario: Usuario;
  itens: VendaProduto[];
}