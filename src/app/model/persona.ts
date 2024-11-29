export class Persona {
  idPersona: number;
  nombres: string;
  apellidos: string;
  telefono: string;
  dni: string;
  isActive: string;

  constructor(
    idPersona: number,
    nombres: string,
    apellidos: string,
    telefono: string,
    dni: string,
    isActive: string
  ) {
    this.idPersona = idPersona;
    this.nombres = nombres;
    this.apellidos = apellidos;
    this.telefono = telefono;
    this.dni = dni;
    this.isActive = isActive;
  }
}
