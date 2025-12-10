import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { QuoteService } from '../../services/quote.service';
import { Cotizacion } from '../../models/cotizacion.model';

@Component({
    selector: 'app-quotes',
    standalone: true,
    imports: [CommonModule],
    templateUrl: './quotes.component.html',
    styleUrls: ['./quotes.component.css']
})
export class QuotesComponent implements OnInit {
    cotizaciones: Cotizacion[] = [];

    constructor(private quoteService: QuoteService) { }

    ngOnInit(): void {
        this.loadQuotes();
    }

    loadQuotes(): void {
        this.quoteService.getCotizaciones().subscribe({
            next: (data) => this.cotizaciones = data,
            error: (err) => console.error(err)
        });
    }

    confirm(id: number | undefined): void {
        if (id) {
            this.quoteService.confirmCotizacion(id).subscribe(() => this.loadQuotes());
        }
    }
}
