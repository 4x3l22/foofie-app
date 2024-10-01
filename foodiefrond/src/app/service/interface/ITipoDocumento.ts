export interface ITipoDocumento {
  id: number;
  nombre: string;
  estado: boolean;
  fechaCreo: Date | null | undefined;
  fechaModifico: Date | null;
  fechaElimino: Date | null;
}
