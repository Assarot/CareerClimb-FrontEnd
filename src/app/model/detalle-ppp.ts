import { Empresa } from "./empresa";
import { PPP } from "./ppp";
import { Requerimiento } from "./requerimiento";

export class DetallePPP {
    idDetallePPP: number;
    requerimiento:Requerimiento;
    ppp:PPP;
    empresa:Empresa;

    constructor(idDetallePPP: number, requerimiento: Requerimiento, ppp: PPP, empresa: Empresa) {
        this.idDetallePPP = idDetallePPP;
        this.requerimiento = requerimiento;
        this.ppp = ppp;
        this.empresa = empresa;
    }
}
