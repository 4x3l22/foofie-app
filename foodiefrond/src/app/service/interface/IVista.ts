export interface IVista {
  id: number;
  nombre: string;
  estado: boolean;
  items: string;
  fechaCreo: Date | null | undefined;
  fechaModifico: Date | null;
  fechaElimino: Date | null;
  moduloId: number;
}
