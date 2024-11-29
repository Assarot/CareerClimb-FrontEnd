import { Cargo } from "./cargo";

export class DetalleCargo {
    idDetalleCargo: number;
    detalle: string;
    isActive: string;
    cargo:Cargo;

    constructor(idDetalleCargo: number, detalle: string, isActive: string, cargo: Cargo) {
        this.idDetalleCargo = idDetalleCargo;
        this.detalle = detalle;
        this.isActive = isActive;
        this.cargo = cargo;
    }
}
