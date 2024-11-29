import { Usuario } from "./usuario";

export class PerfilUsuario {
    idPerfilUsuario: number;
    nombre: string;
    telefono: string;
    nacionalidad: string;
    email: string;
    area: string;
    aboutMe: string;
    isActive:string;
    usuario:Usuario;

    constructor(idPerfilUsuario: number, nombre: string, telefono: string, nacionalidad: string, email: string, area: string, aboutMe: string, isActive: string, usuario: Usuario) {
        this.idPerfilUsuario = idPerfilUsuario;
        this.nombre = nombre;
        this.telefono = telefono;
        this.nacionalidad = nacionalidad;
        this.email = email;
        this.area = area;
        this.aboutMe = aboutMe;
        this.isActive = isActive;
        this.usuario = usuario;
    }
}
