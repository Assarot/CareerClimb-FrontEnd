import { PlanCarrera } from "./plan-carrera";
import { Solicitud } from "./solicitud";

export class PPP {
    idPPP: number;
    periodo:string;
    estado:string;
    horaTotal:string;
    linea:string;
    motivoAbandono:string;
    isActive:string;
    solicitud:Solicitud;
    planCarrera:PlanCarrera;

    constructor(idPPP: number, periodo: string, estado: string, horaTotal: string, linea: string, motivoAbandono: string, isActive: string, solicitud: Solicitud, planCarrera: PlanCarrera) {
        this.idPPP = idPPP;
        this.periodo = periodo;
        this.estado = estado;
        this.horaTotal = horaTotal;
        this.linea = linea;
        this.motivoAbandono = motivoAbandono;
        this.isActive = isActive;
        this.solicitud = solicitud;
        this.planCarrera = planCarrera;
    }
    
}
