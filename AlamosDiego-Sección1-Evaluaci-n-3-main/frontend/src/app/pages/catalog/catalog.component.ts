import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';
import { FurnitureService } from '../../services/furniture.service';
import { Mueble } from '../../models/mueble.model';

@Component({
    selector: 'app-catalog',
    standalone: true,
    imports: [CommonModule, RouterLink],
    templateUrl: './catalog.component.html',
    styleUrls: ['./catalog.component.css']
})
export class CatalogComponent implements OnInit {
    muebles: Mueble[] = [];

    constructor(private furnitureService: FurnitureService) { }

    ngOnInit(): void {
        this.loadMuebles();
    }

    loadMuebles(): void {
        this.furnitureService.getMuebles().subscribe({
            next: (data) => this.muebles = data,
            error: (err) => console.error('Error loading muebles', err)
        });
    }

    deleteMueble(id: number | undefined): void {
        if (id) {
            this.furnitureService.deleteMueble(id).subscribe(() => this.loadMuebles());
        }
    }
}
