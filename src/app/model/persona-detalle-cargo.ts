import { DetalleCargo } from "./detalle-cargo";
import { Persona } from "./persona";

export class PersonaDetalleCargo {
    idPersonaDetalleCargo: number;
    detalleCargo:DetalleCargo;
    persona:Persona;

    constructor(idPersonaDetalleCargo: number, detalleCargo:DetalleCargo, persona:Persona){
        this.idPersonaDetalleCargo = idPersonaDetalleCargo;
        this.detalleCargo = detalleCargo;
        this.persona = persona;
    }
}
