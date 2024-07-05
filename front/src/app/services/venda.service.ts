import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Venda } from '../model/venda.model';

@Injectable({
    providedIn: 'root'
})
export class VendaService {

    private apiUrl = 'http://localhost:8080/api/venda';

    constructor(private http: HttpClient) { }

    save(venda: Venda): Observable<any> {
        return this.http.post(this.apiUrl, venda);
    }

    delete(id: number): Observable<void> {
        return this.http.delete<void>(`${this.apiUrl}/${id}`);
    }

    getVendas(): Observable<Venda[]> {
        return this.http.get<Venda[]>(this.apiUrl);
    }

    getVendasPorUsuario(idUsuario: number): Observable<Venda[]> {
        return this.http.get<Venda[]>(`${this.apiUrl}/usuario/${idUsuario}`);
    }

    getVendasPorProduto(productId: number): Observable<Venda[]> {
        return this.http.get<Venda[]>(`${this.apiUrl}/por-produto/${productId}`);
    }
}
