import { Component } from '@angular/core';
import { NgIf, NgFor } from '@angular/common';
import { InsertarDatosService } from '../../service/insertar-datos.service';
import { FileUploadModule } from 'primeng/fileupload';
import { ButtonModule } from 'primeng/button';

@Component({
  selector: 'app-insertar-datos',
  standalone: true,
  imports: [NgIf, NgFor, FileUploadModule, ButtonModule],
  templateUrl: './insertar-datos.component.html',
  styleUrls: ['./insertar-datos.component.css'],
})
export class InsertarDatosComponent {
  selectedFile: File | null = null;
  uploadSuccess: boolean = false;
  errorMessage: string = '';
  isUploading: boolean = false;  // Nueva variable para controlar el estado de carga

  constructor(private insertarDatosService: InsertarDatosService) {}

  // Maneja la selección de archivos
  onFileSelected(event: any): void {
    const file = event.files[0];
    const allowedExtensions = /(\.xlsx|\.xls)$/i;

    if (!allowedExtensions.exec(file.name)) {
      this.errorMessage = 'Solo se permiten archivos de tipo Excel (.xlsx, .xls).';
      this.uploadSuccess = false;
      this.selectedFile = null;
      return;
    }

    this.selectedFile = file;
    this.errorMessage = '';
  }

  // Limpia los archivos seleccionados
  onClearFiles(): void {
    this.selectedFile = null;
    this.errorMessage = '';
    this.uploadSuccess = false;
  }

  // Inicia la subida de archivos
  startUpload(): void {
    if (!this.selectedFile) return;

    this.isUploading = true;  // Activar el overlay de carga

    this.insertarDatosService.uploadFile(this.selectedFile).subscribe({
      next: () => {
        this.uploadSuccess = true;
        this.errorMessage = '';
        this.selectedFile = null;
        this.isUploading = false;  // Desactivar el overlay de carga
      },
      error: () => {
        this.errorMessage = 'Hubo un error al subir el archivo. Inténtalo de nuevo.';
        this.uploadSuccess = false;
        this.isUploading = false;  // Desactivar el overlay de carga
      },
    });
  }

  // Formatea el tamaño del archivo
  formatSize(bytes: number): string {
    if (bytes === 0) return '0 Bytes';
    const k = 1024;
    const sizes = ['Bytes', 'KB', 'MB', 'GB', 'TB'];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i];
  }

  // Remueve un archivo de la lista
  removeFile(file: File): void {
    if (this.selectedFile === file) {
      this.selectedFile = null;
      this.errorMessage = '';
      this.uploadSuccess = false;
    }
  }
}
