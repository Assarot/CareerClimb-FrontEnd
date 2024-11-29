import { PPP } from "./ppp";

export class InformePPP {
    idInformePPP: number;
    objetivoGeneral: string;
    objetivoEspecifico: string;
    resumen: string;
    logro:string;
    defAlumno:string;
    defEmpresa:string;
    recomendacionEmpresa:string;
    recomendacionCarrera:string;
    ppp:PPP;

    constructor(idInformePPP: number, objetivoGeneral: string, objetivoEspecifico: string, resumen: string, logro: string, defAlumno: string, defEmpresa: string, recomendacionEmpresa: string, recomendacionCarrera: string, ppp: PPP) {
        this.idInformePPP = idInformePPP;
        this.objetivoGeneral = objetivoGeneral;
        this.objetivoEspecifico = objetivoEspecifico;
        this.resumen = resumen;
        this.logro = logro;
        this.defAlumno = defAlumno;
        this.defEmpresa = defEmpresa;
        this.recomendacionEmpresa = recomendacionEmpresa;
        this.recomendacionCarrera = recomendacionCarrera;
        this.ppp = ppp;
    }
}
