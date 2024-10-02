export interface IPersona {
  id: number;
  primerNombre: string;
  segundoNombre?: string;
  primerApellido: string;
  segundoApellido?: string;
  genero: string;
  documentoId: number;
  numeroDocumento: number;
  cumpleanios: Date;
  ciudadId: number;
}
