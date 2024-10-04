export interface IUsuarioRol{
  id: number;
  usuarioId: number;
  rolId: number;
  estado: boolean;
  fechaCreo: Date;
  fechaModifico: Date | null;
  fechaElimino: Date | null;
}
