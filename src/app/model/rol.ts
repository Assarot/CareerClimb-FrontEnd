export class Rol {
    idRol: number;
    nombre: string;
    isActive:string;

    constructor(idRol: number, nombre: string, isActive:string) {
        this.idRol = idRol;
        this.nombre = nombre;
        this.isActive = isActive;
    }
}
