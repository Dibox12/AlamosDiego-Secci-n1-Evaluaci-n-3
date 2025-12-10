import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Mueble } from '../models/mueble.model';

@Injectable({
    providedIn: 'root'
})
export class FurnitureService {
    private apiUrl = 'http://localhost:8085/api/muebles';

    constructor(private http: HttpClient) { }

    getMuebles(): Observable<Mueble[]> {
        return this.http.get<Mueble[]>(this.apiUrl);
    }

    getMueble(id: number): Observable<Mueble> {
        return this.http.get<Mueble>(`${this.apiUrl}/${id}`); // Assuming backend supports GET /api/muebles/{id} - Wait, Controller didn't verify this.
        // Checked controller: It does NOT have GET /{id}. Only GET / (list), POST, PUT /{id}, PUT /{id}/desactivar.
        // I need to ADD GET /{id} to backend if I want Edit to work properly by fetching ID.
        // Or I can filter from list if list is small. But Edit usually fetches.
        // I will add GET /{id} to MuebleControlador as well!
    }

    createMueble(mueble: Mueble): Observable<Mueble> {
        return this.http.post<Mueble>(this.apiUrl, mueble);
    }

    updateMueble(id: number, mueble: Mueble): Observable<Mueble> {
        return this.http.put<Mueble>(`${this.apiUrl}/${id}`, mueble);
    }

    deleteMueble(id: number): Observable<void> {
        // Controller uses PUT /id/desactivar for "deleting" (soft delete)
        return this.http.put<void>(`${this.apiUrl}/${id}/desactivar`, {});
    }
}
