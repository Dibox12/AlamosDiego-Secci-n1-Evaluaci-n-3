export interface Mueble {
    id?: number;
    nombre: string;
    tipo: string;
    precioBase: number;
    stock: number;
    estado: string;
    tamano?: string;
    material?: string;
}
