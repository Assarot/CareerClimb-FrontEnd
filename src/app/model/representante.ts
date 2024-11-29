import { Empresa } from "./empresa";

export class Representante {
    idRepresentante: number;
    emailCorp:string;
    cargo:string;
    isActive:string;
    empresa:Empresa;

    constructor(idRepresentante: number, emailCorp: string, cargo: string, isActive: string, empresa: Empresa) {
        this.idRepresentante = idRepresentante;
        this.emailCorp = emailCorp;
        this.cargo = cargo;
        this.isActive = isActive;
        this.empresa = empresa;
    }
}
