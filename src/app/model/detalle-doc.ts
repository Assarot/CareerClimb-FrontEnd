import { DetallePPP } from './detalle-ppp';

export class DetalleDoc {
  idDetalleDoc: number;
  nombre: string;
  motivo_rechazo: string;
  estado: string;
  isActive: string;
  detallePPP: DetallePPP;

  constructor(
    idDetalleDoc: number,
    nombre: string,
    motivo_rechazo: string,
    estado: string,
    isActive: string,
    detallePPP: DetallePPP
  ) {
    this.idDetalleDoc = idDetalleDoc;
    this.nombre = nombre;
    this.motivo_rechazo = motivo_rechazo;
    this.estado = estado;
    this.isActive = isActive;
    this.detallePPP = detallePPP;
  }
}
