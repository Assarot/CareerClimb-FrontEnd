export class Proceso {
    idProceso: number;
    nombre: string;
    isActive:string;

    constructor(idProceso: number, nombre: string, isActive:string) {
        this.idProceso = idProceso;
        this.nombre = nombre;
        this.isActive = isActive;
    }
}
