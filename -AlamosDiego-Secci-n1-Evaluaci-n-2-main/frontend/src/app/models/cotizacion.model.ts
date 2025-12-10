import { Mueble } from './mueble.model';
import { Variante } from './variante.model';

export interface ItemCotizacion {
    id?: number;
    mueble: Mueble;
    variante?: Variante;
    cantidad: number;
    precioTotal: number;
}

export interface Cotizacion {
    id?: number;
    confirmada: boolean;
    items: ItemCotizacion[];
    cliente?: string;
    fecha?: string;
    total?: number;
}
