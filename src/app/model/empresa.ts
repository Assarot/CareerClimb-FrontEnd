export class Empresa {
    idEmpresa: number;
    razonSocial: string;
    ruc:string;
    email:string;
    telefono:string;
    isActive:string;

    constructor(idEmpresa: number, razonSocial: string, ruc: string, email: string, telefono: string, isActive: string) {
        this.idEmpresa = idEmpresa;
        this.razonSocial = razonSocial;
        this.ruc = ruc;
        this.email = email;
        this.telefono = telefono;
        this.isActive = isActive;
    }
}
