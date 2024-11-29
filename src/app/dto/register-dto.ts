export class RegisterDto {
    email: string;
    password: string;
    roleName: string;
    idPersona:number;
    
    constructor(email: string, password: string, roleName: string, idPersona:number) {
        this.email = email;
        this.password = password;
        this.roleName = roleName;
        this.idPersona = idPersona;
    }
}
