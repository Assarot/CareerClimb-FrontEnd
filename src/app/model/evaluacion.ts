export class Evaluacion {
    idEvaluacion: number;
    nota:number;
    isActive:string;

    constructor(idEvaluacion: number, nota:number, isActive:string){
        this.idEvaluacion = idEvaluacion;
        this.nota = nota;
        this.isActive = isActive;
    }
}
