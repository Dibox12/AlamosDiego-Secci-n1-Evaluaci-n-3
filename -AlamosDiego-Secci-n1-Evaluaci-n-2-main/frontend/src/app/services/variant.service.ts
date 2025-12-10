import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Variante } from '../models/variante.model';

@Injectable({
    providedIn: 'root'
})
export class VariantService {
    private apiUrl = 'http://localhost:8085/api/variantes';

    constructor(private http: HttpClient) { }

    getVariantes(): Observable<Variante[]> {
        return this.http.get<Variante[]>(this.apiUrl);
    }

    createVariante(variante: Variante): Observable<Variante> {
        return this.http.post<Variante>(this.apiUrl, variante);
    }

    updateVariante(id: number, variante: Variante): Observable<Variante> {
        return this.http.put<Variante>(`${this.apiUrl}/${id}`, variante);
    }

    deleteVariante(id: number): Observable<void> {
        return this.http.delete<void>(`${this.apiUrl}/${id}`);
    }
}
