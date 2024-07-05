import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { Categoria } from '../model/categoria.model';

@Injectable({
  providedIn: 'root'
})
export class FiltroService {

  private categoriaSelecionadaSubject = new BehaviorSubject<Categoria | null>(null);
  categoriaSelecionada$ = this.categoriaSelecionadaSubject.asObservable();

  constructor() { }

  setSelectedCategory(categoria: Categoria | null): void {
    this.categoriaSelecionadaSubject.next(categoria);
  }

  clearFilter(): void {
    this.categoriaSelecionadaSubject.next(null);
  }
}