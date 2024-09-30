export interface ICiudad {
  id: number;
  nombre: string;
  descripcion: string;
  estado: boolean;
  paisId: number;
  fechaCreo?: Date | null;
  fechaModifico?: Date | null;
  fechaElimino?: Date | null;
}
