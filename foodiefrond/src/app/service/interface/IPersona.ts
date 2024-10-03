export interface IPersona {
  id: number;
  primerNombre: string;
  segundoNombre?: string;
  primerApellido: string;
  segundoApellido?: string;
  genero: string;
  documentoId: number;
  numeroDocumento: number;
  cumpleanios: Date | string;
  estado: boolean;
  ciudadId: number;
  fechaCreo:  Date;
  fechaModifico:  Date | null;
  fechaElimino:   Date | null;

}
