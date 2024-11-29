import { Linea } from "./linea";
import { PPP } from "./ppp";

export class PPPLinea {
    idPPPLinea: number;
    isActive:string;
    linea:Linea;
    ppp:PPP;

    constructor(idPPPLinea: number, isActive: string, linea: Linea, ppp: PPP) {
        this.idPPPLinea = idPPPLinea;
        this.isActive = isActive;
        this.linea = linea;
        this.ppp = ppp;
    }
}
