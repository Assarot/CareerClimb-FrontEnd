export class Linea {
    idLinea: number;
    nombre: string;
    isActive:string;

    constructor(idLinea: number, nombre: string, isActive:string) {
        this.idLinea = idLinea;
        this.nombre = nombre;
        this.isActive=isActive;
    }
}

