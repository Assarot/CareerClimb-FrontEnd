export class Cargo {
    idCargo: number;
    nombre:string;
    isActive:string;

    constructor(idCargo: number, nombre: string, isActive: string) {
        this.idCargo = idCargo;
        this.nombre = nombre;
        this.isActive = isActive;
    }
}
