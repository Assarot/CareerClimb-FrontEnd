import { PlanCarrera } from "./plan-carrera";

export class Matricula {
    idMatricula:string;
    periodo:string;
    estado:string;
    descripcion:string;
    isActive:string;
    planCarrera:PlanCarrera;

    constructor(idMatricula:string, periodo:string, estado:string, descripcion:string, isActive:string, planCarrera:PlanCarrera){
        this.idMatricula=idMatricula;
        this.periodo=periodo;
        this.estado=estado;
        this.descripcion=descripcion;
        this.isActive=isActive;
        this.planCarrera=planCarrera;
    }
    
}
