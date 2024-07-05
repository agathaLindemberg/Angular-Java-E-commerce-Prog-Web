import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
    providedIn: 'root'
})
export class RelatorioService {
    private readonly apiUrl = 'http://localhost:8080/api/relatorio';

    constructor(private http: HttpClient) { }

    downloadPdfRelatorio(dataInicio: string, dataFim: string, tipoRelatorio: string) {
        return this.http.get(`${this.apiUrl}/relatorio?dataInicio=${dataInicio}&dataFim=${dataFim}&tipoRelatorio=${tipoRelatorio}`, { responseType: 'text' })
            .subscribe(data => {
                document.querySelector('iframe').src = data;
            });
    }
}