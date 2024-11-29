import { PlanCarrera } from "./plan-carrera";
import { Proceso } from "./proceso";
import { Requerimiento } from "./requerimiento";

export class RequerimientoProceso {
    idRequerimientoProceso: number;
    isActive:string;
    proceso:Proceso;
    requerimiento:Requerimiento;
    planCarrera:PlanCarrera;

    constructor(idRequerimientoProceso: number, isActive: string, proceso: Proceso, requerimiento: Requerimiento, planCarrera: PlanCarrera) {
        this.idRequerimientoProceso = idRequerimientoProceso;
        this.isActive = isActive;
        this.proceso = proceso;
        this.requerimiento = requerimiento;
        this.planCarrera = planCarrera;
    }
}
