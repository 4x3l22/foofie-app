export interface IPais {
  id: number; // Opcional para nuevos registros
  nombre: string;
  descripcion: string;
  estado: boolean;
  continenteId: number; // Referencia al continente
  fechaCreo?: Date | null; // Opcional, se establece automáticamente
  fechaModifico?: Date | null; // Opcional, se establece automáticamente
  fechaElimino?: Date | null; // Opcional, para indicar eliminación
}
