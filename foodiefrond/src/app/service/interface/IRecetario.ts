export interface IRecetario{
  id: number,
  usuarioId: number | undefined,
  recetaId: number | undefined,
  estado: true,
  fechaCreo: Date,
  fechaModifico: Date | null,
  fechaElimino: Date | null
}
