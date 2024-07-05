export interface Usuario {
  id?: number;
  nome: string;
  endereco: string;
  email: string;
  login: string;
  senha: string;
  administrador?: boolean;
}