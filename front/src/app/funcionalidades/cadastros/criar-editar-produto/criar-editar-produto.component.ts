import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ProdutoService } from 'src/app/services/produto.service';
import { CategoriaService } from 'src/app/services/categoria.service';
import { Produto } from 'src/app/model/produto.model';
import { Categoria } from 'src/app/model/categoria.model';
import { switchMap } from 'rxjs/operators';

@Component({
  selector: 'app-criar-editar-produto',
  templateUrl: './criar-editar-produto.component.html',
  styleUrls: ['./criar-editar-produto.component.scss']
})
export class CriarEditarProdutoComponent implements OnInit {
  produtoForm: FormGroup;
  categorias: Categoria[];
  produtoId: number | null = null;

  constructor(
    private fb: FormBuilder,
    private produtoService: ProdutoService,
    private categoriaService: CategoriaService,
    private route: ActivatedRoute,
    private router: Router
  ) { }

  ngOnInit(): void {
    this.bindformValidator();

    this.categoriaService.getCategorias().subscribe(categorias => {
      this.categorias = categorias;
    });

    this.route.paramMap.subscribe(params => {
      const id = params.get('id');
      if (id) {
        this.produtoId = +id;
        this.loadProduct(this.produtoId);
      }
    });
  }

  bindformValidator() {
    this.produtoForm = this.fb.group({
      id: [{ value: '', disabled: true }],
      nome: ['', Validators.required],
      descricao: ['', Validators.required],
      autor: ['', [Validators.required, Validators.maxLength(100)]],
      preco: ['', [Validators.required, Validators.min(0)]],
      foto: [''],
      tamanho: ['', Validators.required],
      quantidade: ['', Validators.required],
      categoria: [null, Validators.required]
    });
  }

  loadProduct(id: number): void {
    this.produtoService.getProduto(id).subscribe(produto => {
      this.produtoForm.patchValue({
        ...produto,
        categoria: produto.categoria.id
      });
    });
  }

  onSubmit(): void {
    if (this.produtoForm.valid) {
      const formValue = this.produtoForm.getRawValue();

      this.categoriaService.getCategoria(formValue.categoria).pipe(
        switchMap(categoria => {
          const novoProduto: Produto = {
            ...formValue,
            categoria: categoria
          };

          if (this.produtoId) {
            return this.produtoService.update(novoProduto);
          } else {
            return this.produtoService.save(novoProduto);
          }
        })
      ).subscribe(
        () => {
          console.log('Produto salvo com sucesso!');
          this.router.navigate(['/home']);
        },
        error => {
          console.error('Erro ao salvar produto:', error);
        }
      );
    }
  }
}
