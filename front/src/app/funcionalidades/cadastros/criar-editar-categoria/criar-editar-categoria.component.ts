import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { CategoriaService } from 'src/app/services/categoria.service';

@Component({
  selector: 'app-criar-editar-categoria',
  templateUrl: './criar-editar-categoria.component.html',
  styleUrls: ['./criar-editar-categoria.component.scss']
})
export class CriarEditarCategoriaComponent implements OnInit {
  categoriaForm: FormGroup;
  categoriaId: number | null = null;

  constructor(
    private fb: FormBuilder,
    private categoriaService: CategoriaService,
    private route: ActivatedRoute,
    private router: Router
  ) { }

  ngOnInit(): void {
    this.bindformValidator();

    this.route.paramMap.subscribe(params => {
      const id = params.get('id');
      if (id) {
        this.categoriaId = +id;
        this.loadCategory(this.categoriaId);
      }
    });
  }

  bindformValidator() {
    this.categoriaForm = this.fb.group({
      id: [{ value: '', disabled: true }],
      nome: ['', Validators.required],
      descricao: ['', Validators.required],
    });
  }

  loadCategory(id: number): void {
    this.categoriaService.getCategoria(id).subscribe(categoria => {
      this.categoriaForm.patchValue(categoria);
    });
  }

  onSubmit(): void {
    if (this.categoriaForm.valid) {
      const formValue = this.categoriaForm.getRawValue();

      if (this.categoriaId) {
        formValue.id = this.categoriaId;
        this.categoriaService.update(formValue).subscribe(
          () => {
            console.log('Categoria atualizada com sucesso!');
            this.router.navigate(['/home']);
          },
          error => {
            console.error('Erro ao atualizar categoria:', error);
          }
        );
      } else {
        this.categoriaService.save(formValue).subscribe(
          () => {
            console.log('Categoria criada com sucesso!');
            this.router.navigate(['/home']);
          },
          error => {
            console.error('Erro ao criar categoria:', error);
          }
        );
      }
    }
  }
}
