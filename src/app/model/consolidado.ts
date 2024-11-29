export class Consolidado {
    id: number;
    name: string;
    url: string;
    type: string;
    size: number;
    idPPP?: number; // Campo opcional para asociar un Detalle_PPP
    uploadProgress: number; // Propiedad para el progreso de carga
    fechaSubida: string; // Nueva propiedad para la fecha de subida

    constructor(
        id: number,
        name: string,
        url: string,
        type: string,
        size: number,
      fechaSubida: string, // Incluimos fechaSubida en el constructor
      uploadProgress: number = 0, // Inicializamos el progreso en 0
        idPPP?: number
    ) {
        this.id = id;
        this.name = name;
        this.url = url;
        this.type = type;
        this.size = size;
        this.uploadProgress = uploadProgress;
        this.idPPP = idPPP;
        this.fechaSubida = fechaSubida; // Asignamos la fecha de subida
    }
}