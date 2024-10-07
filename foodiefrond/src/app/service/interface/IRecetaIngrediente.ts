export interface IRecetaIngrediente {
  id: number;
  recetaId: number;
  ingredienteId: number;
  estado: boolean;
  fechaCreo: Date;
  fechaModifico: Date | null;
  fechaElimino: Date | null;
}
