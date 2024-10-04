export interface IRecetaIngrediente {
  id: number;
  recetaId: number;
  ingredienteId: number;
  estado: boolean;
  fechaCreo: string;
  fechaModifico: string | null;
  fechaElimino: string | null;
}
