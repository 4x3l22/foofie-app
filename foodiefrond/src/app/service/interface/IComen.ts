export interface IComen{
  id: number,
  texto: string,
  usuarioId: number,
  publicacionesId: number,
  comentarioId: number |  null,
  estado: boolean,
  fechaCreo: Date,
  fechaModifico: Date  | null,
  fechaElimino: Date  | null,
}
