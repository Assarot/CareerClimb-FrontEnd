import { Carrera } from "./carrera";
import { Plan } from "./plan";

export class PlanCarrera {
    idPlanCarrera: number;
    plan:Plan;
    carrera:Carrera;

    constructor(idPlanCarrera: number, plan:Plan, carrera:Carrera){
        this.idPlanCarrera = idPlanCarrera;
        this.plan = plan;
        this.carrera = carrera;
    }
    
}
