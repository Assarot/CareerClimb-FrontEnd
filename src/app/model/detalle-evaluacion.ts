import { PlanCarrera } from "./plan-carrera";
import { Rubro } from "./rubro";

export class DetalleEvaluacion {
    idDetalleEvaluacion: number;
    rubro:Rubro;
    planCarrera:PlanCarrera;

    constructor(idDetalleEvaluacion: number, rubro:Rubro, planCarrera:PlanCarrera){
        this.idDetalleEvaluacion = idDetalleEvaluacion;
        this.rubro = rubro;
        this.planCarrera = planCarrera;
    }
}
