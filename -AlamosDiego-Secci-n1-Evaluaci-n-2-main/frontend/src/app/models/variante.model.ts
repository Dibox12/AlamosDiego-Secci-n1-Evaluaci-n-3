import { Mueble } from "./mueble.model";

export interface Variante {
    id?: number;
    descripcion: string;
    incrementoPrecio: number;
    mueble?: Mueble; // Optional if we move to global variants
    muebleId?: number; // Helper for updates
}
