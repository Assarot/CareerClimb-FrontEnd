import { Rol } from "./rol";
import { Usuario } from "./usuario";

export class UsuarioRol {
    idUsuarioRol: number;
    usuario:Usuario;
    rol:Rol;

    constructor(idUsuarioRol: number, usuario: Usuario, rol: Rol) {
        this.idUsuarioRol = idUsuarioRol;
        this.usuario = usuario;
        this.rol = rol;
    }
}
