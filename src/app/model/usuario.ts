import { Persona } from "./persona";

export class Usuario {
    idUsuario: number;
    username: string;
    password: string;
    isActive:string;
    persona:Persona;

    constructor(idUsuario: number, username: string, password: string, isActive:string, persona:Persona) {
        this.idUsuario = idUsuario;
        this.username = username;
        this.password = password;
        this.isActive = isActive;
        this.persona = persona;
    }
}
