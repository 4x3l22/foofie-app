export interface IPublicacion{
  id: number,
  titulo: string,
  foto: string | ArrayBuffer | null,
  descripcion: string,
  recetaId: number,
  usuarioId: number | undefined,
  estado: boolean,
  fechaCreo: Date,
  fechaModifico: Date | null,
  fechaElimino: Date | null
}
