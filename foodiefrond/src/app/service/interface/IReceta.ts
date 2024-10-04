export interface IReceta {
  id: number;
  nombre: string;
  tiempos: string;
  imaganesReceta: string | undefined;
  pasos: string;
  calificacion: number | null;
  estado: boolean;
  tipoCocinaId: number;
  fechaCreo: Date | null | undefined;
  fechaModifico: Date | null;
  fechaElimino: Date | null;
}
