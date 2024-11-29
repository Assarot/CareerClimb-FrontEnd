import { Consolidado } from "./consolidado";

export class Seccion {
    idSeccion: number;
    nombre:string;
    descripcion:string;
    isActive:string;
    consolidado:Consolidado;
    seccion:Seccion;

    constructor(idSeccion:number,nombre:string,descripcion:string,isActive:string,consolidado:Consolidado,seccion:Seccion){
        this.idSeccion=idSeccion;
        this.nombre=nombre;
        this.descripcion=descripcion;
        this.isActive=isActive;
        this.consolidado=consolidado;
        this.seccion=seccion;
    }
}
