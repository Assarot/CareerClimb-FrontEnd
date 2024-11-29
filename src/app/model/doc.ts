export class Doc {
  id: number; // ID del documento
  nombre: string; // Nombre del archivo
  ruta: string; // Ruta donde está almacenado
  tipo: string; // Tipo MIME del archivo (e.g., application/pdf)
  fechaSubida: string; // Fecha en la que se subió el archivo
  estado: string; // Estado del documento (e.g., "Pendiente", "Aprobado")
  idDetalleDoc?: number; // ID del detalle asociado al documento (opcional)

  constructor(
    id: number,
    nombre: string,
    ruta: string,
    tipo: string,
    fechaSubida: string,
    estado: string,
    idDetalleDoc?: number
  ) {
    this.id = id;
    this.nombre = nombre;
    this.ruta = ruta;
    this.tipo = tipo;
    this.fechaSubida = fechaSubida;
    this.estado = estado;
    this.idDetalleDoc = idDetalleDoc;
  }
}
