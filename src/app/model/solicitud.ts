export class Solicitud {
    idsolicitud: number;
    razonsocial: string;
    ruc: string;
    emEmail: string;
    representante: string;
    re_cargo: string;
    re_email: string;
    isActive: string;
    matricula: any;
    periodo: string; // Nueva propiedad

constructor(
    idsolicitud: number,
    razonsocial: string,
    ruc: string,
    emEmail: string,
    representante: string,
    re_cargo: string,
    re_email: string,
    isActive: string,
    matricula: any,
    periodo: string // Nueva propiedad
) {
    this.idsolicitud = idsolicitud;
    this.razonsocial = razonsocial;
    this.ruc = ruc;
    this.emEmail = emEmail;
    this.representante = representante;
    this.re_cargo = re_cargo;
    this.re_email = re_email;
    this.isActive = isActive;
    this.matricula = matricula;
    this.periodo = periodo; // Inicialización de la nueva propiedad
}
}
