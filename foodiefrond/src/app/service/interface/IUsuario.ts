export interface IUsuarioi{
  id: number;
  nombreUsuario: string;
  correo: string;
  contrasena: string;
  fotoPerfil: string | undefined;
  personaId: number;
  planesId: number;
  fechaCreo: Date;
  fechaModifico: Date | null;
  fechaElimino: Date | null;
}
