import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { UsuarioService } from 'src/app/services/usuario.service';
import { Usuario } from 'src/app/model/usuario.model';
import { VendaService } from 'src/app/services/venda.service';
import { Venda } from 'src/app/model/venda.model';
import { Categoria } from 'src/app/model/categoria.model';
import { CategoriaService } from 'src/app/services/categoria.service';
import { ProdutoService } from 'src/app/services/produto.service';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { Produto } from 'src/app/model/produto.model';
import { RelatorioService } from 'src/app/services/relatorio.service';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-pagina-usuario',
  templateUrl: './pagina-usuario.component.html',
  styleUrls: ['./pagina-usuario.component.scss']
})
export class PaginaUsuarioComponent implements OnInit {
  usuario: Usuario | null = null;
  loading: boolean = true;
  vendas: Venda[] = [];
  categorias: Categoria[] = [];
  produtos: Produto[] = [];
  dataInicio: string;
  dataFim: string;

  constructor(
    private usuarioService: UsuarioService,
    private vendaService: VendaService,
    private categoriaService: CategoriaService,
    private produtoService: ProdutoService,
    private relatorioService: RelatorioService,
    private toastr: ToastrService,

    private router: Router
  ) { }

  ngOnInit(): void {
    const usuario = this.usuarioService.getUsuario();
    if (usuario) {
      this.usuario = usuario;
      this.loading = false;
      this.loadSales();

      if (this.usuario.administrador) {
        this.loadCategories();
        this.loadProducts();
      }

    } else {
      this.router.navigate(['/login']);
    }
  }

  private loadSales(): void {
    if (this.usuario && !this.usuario.administrador) {
      this.vendaService.getVendasPorUsuario(this.usuario.id).subscribe(
        vendas => {
          this.vendas = vendas;
        },
        error => {
          console.error('Erro ao carregar vendas:', error);
        }
      );
    } else {
      this.vendaService.getVendas().subscribe(
        vendas => {
          this.vendas = vendas;
        },
        error => {
          console.error('Erro ao carregar vendas:', error);
        }
      );
    }
  }

  private loadCategories(): void {
    this.categoriaService.getCategorias().subscribe(
      categorias => {
        this.categorias = categorias;
      },
      error => {
        console.error('Erro ao carregar categorias:', error);
      }
    );
  }

  private loadProducts(): void {
    this.produtoService.getProdutos().subscribe(
      produtos => {
        this.produtos = produtos;
      },
      error => {
        console.error('Erro ao carregar produtos:', error);
      }
    );
  }

  deleteSale(id: number): void {
    if (confirm('Tem certeza que deseja excluir a venda?')) {
      this.vendaService.delete(id).subscribe(
        () => {
          alert('Venda excluída com sucesso!');
          this.vendas = this.vendas.filter(c => c.id !== id);
        },
        error => {
          alert('Erro ao excluir venda!');
          console.error('Erro:', error);
        }
      );
    };
  }

  newCategory(): void {
    this.router.navigate(['/categorias/cadastrar']);
  }

  editCategory(id: number): void {
    this.router.navigate(['/categorias/editar/' + id]);
  }

  deleteCategory(id: number): void {
    if (confirm('Tem certeza que deseja excluir a categoria?')) {
      this.hasProducts(id).subscribe(hasProducts => {
        if (!hasProducts) {
          this.categoriaService.delete(id).subscribe(
            () => {
              alert('Categoria excluída com sucesso!');
              this.categorias = this.categorias.filter(c => c.id !== id);
            },
            error => {
              alert('Erro ao excluir categoria!');
              console.error('Erro:', error);
            }
          );
        } else {
          alert('Não é possível excluir a categoria, pois possui produtos associados.');
        }
      });
    }
  }

  newProduct(): void {
    this.router.navigate(['/produtos/cadastrar']);
  }

  editProduct(id: number): void {
    this.router.navigate(['/produtos/editar/' + id]);
  }

  deleteProduct(id: number): void {
    if (confirm('Tem certeza que deseja excluir o produto?')) {
      this.hasSales(id).subscribe(hasSales => {
        if (!hasSales) {
          this.produtoService.delete(id).subscribe(
            () => {
              alert('Produto excluído com sucesso!');
              this.produtos = this.produtos.filter(p => p.id !== id);
            },
            error => {
              alert('Erro ao excluir produto!');
              console.error('Erro:', error);
            }
          );
        } else {
          alert('Não é possível excluir o produto, pois possui vendas associadas.');
        }
      });
    }
  }

  updateUser(): void {
    if (this.usuario) {
      console.log('Atualizando usuário:', this.usuario);
      this.usuarioService.update(this.usuario).subscribe(
        updatedUsuario => {
          alert('Usuário atualizado com sucesso!');
          this.usuario = updatedUsuario;
          localStorage.setItem('usuario', JSON.stringify(updatedUsuario));
        },
        error => {
          alert('Erro ao atualizar usuário');
        }
      );
    }
  }

  deleteUser(): void {
    if (this.usuario && confirm('Tem certeza que deseja excluir sua conta?')) {
      console.log('Excluindo usuário:', this.usuario);
      this.usuarioService.delete(this.usuario.id).subscribe(
        () => {
          alert('Conta excluída com sucesso!');
          this.router.navigate(['/login']);
        },
        error => {
          alert('Erro ao excluir a conta');
        }
      );
    }
  }


  private hasProducts(categoriaId: number): Observable<boolean> {
    return this.produtoService.getProdutosPorCategoria(categoriaId).pipe(
      map(produtos => produtos.length > 0)
    );
  }

  private hasSales(productId: number): Observable<boolean> {
    return this.vendaService.getVendasPorProduto(productId).pipe(
      map(vendas => vendas.length > 0)
    );
  }

  logout() {
    this.usuarioService.logout();
    this.router.navigate(['/home']);
  }

  relatorioUsuarios() {
    this.relatorioService.downloadPdfRelatorio(this.dataInicio, this.dataFim, 'relatorio_usuario');
  }

  relatorioProdutos() {
    this.relatorioService.downloadPdfRelatorio(this.dataInicio, this.dataFim, 'relatorio_produto');
  }

  relatorioVendas() {
    if (!this.dataInicio || !this.dataFim) {
        this.toastr.warning('Por favor, preencha as datas de início e fim.', 'Campos obrigatórios');
        return;
    }
    this.relatorioService.downloadPdfRelatorio(this.dataInicio, this.dataFim, 'relatorio_venda');
  }

  areDatesValid(): boolean {
    return this.dataInicio !== undefined && this.dataFim !== undefined && this.dataInicio !== '' && this.dataFim !== '';
  }
}
