export class Requerimiento {
    idRequerimiento: number;
    nombre: string;
    isActive:string;

    constructor(idRequerimiento: number, nombre: string, isActive:string) {
        this.idRequerimiento = idRequerimiento;
        this.nombre = nombre;
        this.isActive = isActive;
    }
}
