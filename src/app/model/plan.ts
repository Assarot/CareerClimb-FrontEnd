export class Plan {
    idPlan: number;
    plan: string;
    isActive:string;

    constructor(idPlan: number, plan: string, isActive:string) {
        this.idPlan = idPlan;
        this.plan = plan;
        this.isActive = isActive;
    }
}
