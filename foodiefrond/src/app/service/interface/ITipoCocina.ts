export interface ITipoCocina {
  id: number;
  nombre: string;
  descripcion: string;
  estado: boolean;
  fechaCreo: Date | null | undefined;
  fechaModifico: Date | null;
  fechaElimino: Date | null;
}
