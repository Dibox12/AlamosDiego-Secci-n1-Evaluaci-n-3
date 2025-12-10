import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { FurnitureService } from '../../services/furniture.service';
import { VariantService } from '../../services/variant.service';
import { QuoteService } from '../../services/quote.service';
import { Mueble } from '../../models/mueble.model';
import { Variante } from '../../models/variante.model';
import { Cotizacion, ItemCotizacion } from '../../models/cotizacion.model';

@Component({
  selector: 'app-public-catalog',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './public-catalog.component.html',
  styleUrls: ['./public-catalog.component.css']
})
export class PublicCatalogComponent implements OnInit {
  muebles: Mueble[] = [];
  variantes: Variante[] = [];
  cartItems: ItemCotizacion[] = [];
  clientName: string = '';

  // Filter Properties
  searchTerm: string = '';
  selectedType: string = '';
  selectedSize: string = '';
  selectedMaterial: string = '';
  minPrice: number | null = null;
  maxPrice: number | null = null;

  // Unique Options for Dropdowns
  uniqueTypes: string[] = [];
  uniqueSizes: string[] = [];
  uniqueMaterials: string[] = [];

  constructor(
    private furnitureService: FurnitureService,
    private variantService: VariantService,
    private quoteService: QuoteService
  ) { }

  ngOnInit(): void {
    this.furnitureService.getMuebles().subscribe(data => {
      this.muebles = data.filter(m => m.estado === 'activo');
      this.extractFilterOptions();
    });
    this.variantService.getVariantes().subscribe(data => this.variantes = data);
  }

  extractFilterOptions() {
    this.uniqueTypes = [...new Set(this.muebles.map(m => m.tipo))].sort();
    this.uniqueSizes = [...new Set(this.muebles.map(m => m.tamano).filter(t => !!t) as string[])].sort();
    this.uniqueMaterials = [...new Set(this.muebles.map(m => m.material).filter(m => !!m) as string[])].sort();
  }

  get filteredMuebles(): Mueble[] {
    return this.muebles.filter(m => {
      const matchSearch = !this.searchTerm || m.nombre.toLowerCase().includes(this.searchTerm.toLowerCase());
      const matchType = !this.selectedType || m.tipo === this.selectedType;
      const matchSize = !this.selectedSize || m.tamano === this.selectedSize;
      const matchMaterial = !this.selectedMaterial || m.material === this.selectedMaterial;
      const matchMinPrice = this.minPrice === null || m.precioBase >= this.minPrice;
      const matchMaxPrice = this.maxPrice === null || m.precioBase <= this.maxPrice;

      return matchSearch && matchType && matchSize && matchMaterial && matchMinPrice && matchMaxPrice;
    });
  }

  addToQuote(mueble: Mueble, qty: string, variantId: string) {
    const quantity = parseInt(qty);
    if (quantity <= 0) return;
    if (mueble.stock < quantity) {
      alert('Stock insuficiente');
      return;
    }
    const selectedVariant = this.variantes.find(v => v.id === +variantId) || { id: undefined, descripcion: 'Estándar', incrementoPrecio: 0 };

    // Create Item with objects as required by new model
    const item: ItemCotizacion = {
      mueble: mueble,
      variante: selectedVariant.id ? selectedVariant : undefined,
      cantidad: quantity,
      precioTotal: (mueble.precioBase + (selectedVariant.incrementoPrecio || 0)) * quantity
    };

    this.cartItems.push(item);
    alert('Agregado a la cotización');
  }

  submitQuote() {
    if (!this.clientName || this.cartItems.length === 0) {
      alert('Ingrese nombre y agregue items');
      return;
    }

    const cotizacion: Cotizacion = {
      cliente: this.clientName,
      fecha: new Date().toISOString().split('T')[0],
      confirmada: false,
      items: this.cartItems,
      total: this.totalEstimado
    };

    this.quoteService.createCotizacion(cotizacion).subscribe({
      next: () => {
        alert('Cotización enviada exitosamente!');
        this.cartItems = [];
        this.clientName = '';
      },
      error: (err) => alert('Error al enviar cotización')
    });
  }

  getVariantPrice(muebleId: number | undefined, variantId: string): number {
    if (!variantId) return 0;
    const v = this.variantes.find(vr => vr.id == +variantId);
    return v ? v.incrementoPrecio : 0;
  }

  get totalEstimado(): number {
    return this.cartItems.reduce((acc, item) => acc + item.precioTotal, 0);
  }

  scrollToQuote() {
    const el = document.getElementById('quote-section');
    if (el) el.scrollIntoView({ behavior: 'smooth' });
  }
}
