import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Cotizacion } from '../models/cotizacion.model';

@Injectable({
    providedIn: 'root'
})
export class QuoteService {
    private apiUrl = 'http://localhost:8085/api/cotizaciones';

    constructor(private http: HttpClient) { }

    getCotizaciones(): Observable<Cotizacion[]> {
        return this.http.get<Cotizacion[]>(this.apiUrl);
    }

    confirmCotizacion(id: number): Observable<Cotizacion> {
        return this.http.put<Cotizacion>(`${this.apiUrl}/${id}/confirmar`, {});
    }

    createCotizacion(cotizacion: Cotizacion): Observable<Cotizacion> {
        return this.http.post<Cotizacion>(this.apiUrl, cotizacion);
    }
}
