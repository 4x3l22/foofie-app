export interface IContinente {
  id: number;
  nombre: string;
  descripcion: string;
  estado: boolean;
  fechaCreo?: Date | undefined | null;
  fechaModifico?: Date | undefined | null;
  fechaElimino?: Date | null | undefined;
}
