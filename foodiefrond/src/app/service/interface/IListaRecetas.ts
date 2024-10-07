export interface IListaRecetas{
  id: number;
  nombre: string;
  descripcion: string;
  tiempos: string;
  imaganesReceta: string ;
  pasos: string;
  calificacion: number;
  estado: boolean;
  tipoCocinaId: number;
}
