export interface IModulo{
  id: number,
  nombre: string,
  descripcion: string,
  items: string;
  estado: boolean,
  fechaCreo: Date | null | undefined,
  fechaModifico: Date | null,
  fechaElimino: Date | null
}
