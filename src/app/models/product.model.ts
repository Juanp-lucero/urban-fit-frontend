export interface Product {

  id: number;

  nombre: string;
  precio: number;

  stock: number;

  talla: string;

  tallaSeleccionada?: string;

  genero?: string;

  tipo?: string;

  imagenUrl?: string;

  tipoManga?: string;

  tipoCierre?: string;

  tieneCapucha?: boolean;

  cantidad?: number;
}