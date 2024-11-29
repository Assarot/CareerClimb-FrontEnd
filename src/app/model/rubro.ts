export class Rubro {
    idRubro: number;
    nombre:string;
    descripcion:string;
    ponderado:number;
    isActive:string;

    constructor(idRubro: number, nombre: string, descripcion: string, ponderado: number, isActive: string) {
        this.idRubro = idRubro;
        this.nombre = nombre;
        this.descripcion = descripcion;
        this.ponderado = ponderado;
        this.isActive = isActive;
    }
}
