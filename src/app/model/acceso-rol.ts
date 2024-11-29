import { Acceso } from "./acceso";
import { Rol } from "./rol";

export class AccesoRol {
    idAccesoRol:number;
    rol:Rol;
    acceso:Acceso;

    constructor(idAccesoRol: number, rol: Rol, acceso: Acceso) {
        this.idAccesoRol = idAccesoRol;
        this.rol = rol;
        this.acceso = acceso;
    }
}
