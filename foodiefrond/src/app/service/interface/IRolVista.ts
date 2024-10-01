export interface IRolVista {
  id: number;
  rolId: number;
  vistaId: number;
  estado: boolean;
  fechaCreo: Date | null | undefined;
  fechaModifico: Date | null;
  fechaElimino: Date | null; // puede ser null si la entidad no ha sido eliminada
}
