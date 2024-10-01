export interface IPlanes{
  id: number;
  nombre: string;
  descripcion: string;
  precio: number;
  mediospagoId: number;
  estado: boolean;
  fechaCreo: Date | null | undefined;
  fechaModifico: Date | null;
  fechaElimino: Date | null;
}
