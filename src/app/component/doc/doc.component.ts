import { Component, ViewChild, ElementRef } from '@angular/core';
import { TableModule } from 'primeng/table';
import { CommonModule } from '@angular/common';
import { ButtonModule } from 'primeng/button';
import { RouterModule } from '@angular/router';
import { InputTextModule } from 'primeng/inputtext';
import { FormsModule } from '@angular/forms';
import { ConfirmDialogModule } from 'primeng/confirmdialog';
import { DialogModule } from 'primeng/dialog';
import { ToastModule } from 'primeng/toast';
import { DocService } from '../../service/doc.service';
import { ConfirmationService, MessageService } from 'primeng/api';
import { SafePipe } from '../../pipes/safe.pipe';
import { Doc } from '../../model/doc';

@Component({
  selector: 'app-doc',
  standalone: true,
  imports: [
    TableModule,
    CommonModule,
    ButtonModule,
    RouterModule,
    InputTextModule,
    FormsModule,
    ConfirmDialogModule,
    DialogModule,
    ToastModule,
    SafePipe,
  ],
  templateUrl: './doc.component.html',
  styleUrls: ['./doc.component.css'],
})
export class DocComponent {
  docs: Doc[] = [];
  docsSubidos: number = 0;
  selectedFile: File | null = null;
  isUploading: boolean = false;
  progress: number = 0;
  modalVisible: boolean = false;
  archivoUrl: string | null = null;

  // Propiedades automáticas
  nombreDetalle: string = ''; // Se asignará automáticamente con el nombre del archivo

  @ViewChild('fileInput') fileInput!: ElementRef;

  constructor(
    private docService: DocService,
    private messageService: MessageService,
    private confirmationService: ConfirmationService
  ) {}

  ngOnInit(): void {
    this.listarArchivos();
  }

  listarArchivos(): void {
    this.docService.getFiles().subscribe({
      next: (data) => {
        this.docs = data;
        this.docsSubidos = this.docs.length;
      },
      error: (err) => {
        console.error('Error al listar archivos:', err);
        this.messageService.add({
          severity: 'error',
          summary: 'Error',
          detail: 'No se pudieron cargar los documentos.',
        });
      },
    });
  }

  onFileSelected(event: any): void {
    this.selectedFile = event.target.files[0];
    if (this.selectedFile) {
      this.nombreDetalle = this.selectedFile.name; // Nombre del archivo como nombre del detalle
    }
  }

  uploadDoc(): void {
    if (this.selectedFile) {
      this.isUploading = true;

      this.docService
        .uploadFiles(this.selectedFile, this.nombreDetalle)
        .subscribe({
          next: (response) => {
            this.isUploading = false;
            this.messageService.add({
              severity: 'success',
              summary: 'Archivo Enviado',
              detail: response.message,
            });
            this.listarArchivos();
            this.removeSelectedFile();
          },
          error: (err) => {
            console.error('Error al subir archivo:', err);
            this.isUploading = false;
            this.messageService.add({
              severity: 'error',
              summary: 'Error',
              detail: 'No se pudo enviar el archivo.',
            });
          },
        });
    } else {
      this.messageService.add({
        severity: 'warn',
        summary: 'Archivo no seleccionado',
        detail: 'Por favor selecciona un archivo para enviar.',
      });
    }
  }

  confirmSaveDoc(): void {
    this.confirmationService.confirm({
      message: '¿Estás seguro de que deseas subir este archivo?',
      header: 'Confirmar Subida',
      icon: 'pi pi-exclamation-triangle',
      accept: () => this.uploadDoc(),
    });
  }

  deleteDoc(id: number): void {
    this.docService.deleteFile(id).subscribe({
      next: () => {
        this.messageService.add({
          severity: 'success',
          summary: 'Eliminado',
          detail: 'El archivo fue eliminado exitosamente.',
        });
        this.listarArchivos();
      },
      error: (err) => {
        console.error('Error al eliminar archivo:', err);
        this.messageService.add({
          severity: 'error',
          summary: 'Error',
          detail: 'No se pudo eliminar el archivo.',
        });
      },
    });
  }

  downloadDoc(id: number, name: string): void {
    this.docService.getFileForPreview(id).subscribe((blob: Blob) => {
      const url = window.URL.createObjectURL(blob);
      const anchor = document.createElement('a');
      anchor.href = url;
      anchor.download = name;
      anchor.click();
      window.URL.revokeObjectURL(url);
    });
  }

  visualizarDocEnModal(id: number): void {
    const docSeleccionado = this.docs.find((doc) => doc.id === id);

    if (docSeleccionado?.tipo.includes('pdf')) {
      this.docService.getFileForPreview(id).subscribe((blob: Blob) => {
        this.archivoUrl = window.URL.createObjectURL(blob);
        this.modalVisible = true;
      });
    } else {
      this.messageService.add({
        severity: 'warn',
        summary: 'Formato no soportado',
        detail: 'El formato del archivo no es compatible con la vista previa.',
      });
    }
  }

  cerrarModal(): void {
    this.modalVisible = false;
    this.archivoUrl = null;
  }

  removeSelectedFile(): void {
    this.selectedFile = null;
    if (this.fileInput) {
      this.fileInput.nativeElement.value = '';
    }
  }

  getFileIcon(fileType: string): string {
    if (fileType === 'application/pdf') {
      return 'assets/icons/ext-pdf-min.png';
    } else if (
      fileType === 'application/msword' ||
      fileType ===
        'application/vnd.openxmlformats-officedocument.wordprocessingml.document'
    ) {
      return 'assets/icons/ext-doc-min.png';
    }
    return 'assets/icons/default-icon.png';
  }

  confirmDeleteDoc(id: number): void {
    this.confirmationService.confirm({
      message: '¿Estás seguro de que deseas eliminar este archivo?',
      header: 'Confirmar Eliminación',
      icon: 'pi pi-exclamation-triangle',
      accept: () => {
        this.deleteDoc(id);
      },
      reject: () => {
        this.messageService.add({
          severity: 'info',
          summary: 'Operación cancelada',
          detail: 'No se eliminó el archivo',
        });
      },
    });
  }
}
