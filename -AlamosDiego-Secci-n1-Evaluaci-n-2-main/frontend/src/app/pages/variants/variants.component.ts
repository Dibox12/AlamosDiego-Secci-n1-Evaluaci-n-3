import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';
import { VariantService } from '../../services/variant.service';
import { Variante } from '../../models/variante.model';

@Component({
    selector: 'app-variants',
    standalone: true,
    imports: [CommonModule, RouterLink],
    templateUrl: './variants.component.html',
    styleUrls: ['./variants.component.css']
})
export class VariantsComponent implements OnInit {
    variantes: Variante[] = [];

    constructor(private variantService: VariantService) { }

    ngOnInit(): void {
        this.variantService.getVariantes().subscribe({
            next: (data) => this.variantes = data,
            error: (err) => console.error(err)
        });
    }
}
