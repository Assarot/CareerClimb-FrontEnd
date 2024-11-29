import { Component, ViewChild, ElementRef } from '@angular/core';
import { HomeComponent } from '../../home/home.component';
import { TableModule } from 'primeng/table';
import { CommonModule } from '@angular/common';
import { ButtonModule } from 'primeng/button';
import { RouterModule } from '@angular/router';
import { InputTextModule } from 'primeng/inputtext';
import { FormsModule } from '@angular/forms';
import { ConfirmDialogModule } from 'primeng/confirmdialog';
import { DialogModule } from 'primeng/dialog';
import { ToastModule } from 'primeng/toast';
import { ConsolidadoService } from '../../service/consolidado.service';
import { ConfirmationService, MessageService } from 'primeng/api';
import { SafePipe } from '../../pipes/safe.pipe';
import { Consolidado } from '../../model/consolidado';

@Component({
  selector: 'app-consolidado',
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
  templateUrl: './consolidado.component.html',
  styleUrls: ['./consolidado.component.css'],
})
export class ConsolidadoComponent {
  archivos: Consolidado[] = [];
  titulo: string = 'Subir Archivo';
  opc: string = 'Subir';
  consolidado = new Consolidado(0, '', '', '', 0, '', 0); 
  op = 0;
  selectedFile: File | null = null;
  selectedFileType: string = '';
  modalVisible: boolean = false;
  archivoUrl: string | null = null;
  archivosSubidos: number = 0;

  isUploading: boolean = false;
  progress: number = 0;

  @ViewChild('fileInput') fileInput!: ElementRef;

  constructor(
    private consolidadoService: ConsolidadoService,
    private messageService: MessageService,
    private confirmationService: ConfirmationService
  ) {}

  ngOnInit(): void {
    this.listarArchivos();
  }

  listarArchivos() {
    this.consolidadoService.getFiles().subscribe((data) => {
      this.archivos = data;
      this.archivosSubidos = this.archivos.length;
    });
  }

  onFileSelected(event: any) {
    this.selectedFile = event.target.files[0];
    if (this.selectedFile) {
      const archivoExistente = this.archivos.find(
        (archivo) =>
          archivo.name === this.selectedFile?.name &&
          archivo.size === this.selectedFile?.size
      );
  
      if (archivoExistente) {
        this.messageService.add({
          severity: 'warn',
          summary: 'Archivo duplicado',
          detail: `El archivo "${this.selectedFile.name}" ya ha sido subido anteriormente.`,
        });
        this.removeSelectedFile(); 
        return;
      }
  
      this.selectedFileType = this.selectedFile.type;
  
      this.isUploading = true;
      this.progress = 0;
  
      const uploadInterval = setInterval(() => {
        if (this.progress < 100) {
          this.progress += 10;
        } else {
          clearInterval(uploadInterval);
          this.isUploading = false; 
          this.messageService.add({
            severity: 'success',
            summary: 'Carga completada',
            detail: 'El archivo ha sido cargado exitosamente.',
          });
        }
      }, 500); 
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

  confirmDeleteArchivo(id: number) {
    this.confirmationService.confirm({
      message: '¿Estás seguro de que deseas eliminar este archivo?',
      header: 'Confirmar Eliminación',
      icon: 'pi pi-exclamation-triangle',
      accept: () => {
        this.deleteArchivo(id);
        this.removeSelectedFile(); 
      },
      reject: () => {
        this.messageService.add({
          severity: 'info',
          summary: 'Cancelado',
          detail: 'Has cancelado la operación',
        });
      },
    });
  }
  

  deleteArchivo(id: number) {
    this.consolidadoService.deleteFile(id).subscribe({
      next: () => {
        this.messageService.add({
          severity: 'success',
          summary: 'Eliminado',
          detail: 'El archivo ha sido eliminado exitosamente',
        });
        this.listarArchivos();
      },
      error: () => {
        this.messageService.add({
          severity: 'error',
          summary: 'Error',
          detail: 'No se pudo eliminar el archivo',
        });
      },
    });
  }

  confirmSaveArchivo() {
    this.confirmationService.confirm({
      message: '¿Estás seguro de que deseas subir este archivo?',
      header: 'Confirmar Acción',
      icon: 'pi pi-exclamation-triangle',
      accept: () => {
        this.uploadArchivo();
      },
    });
  }

  uploadArchivo(): void {
    if (this.selectedFile) {
      this.isUploading = true; 
      this.progress = 0;

      this.consolidadoService.uploadFiles([this.selectedFile]).subscribe({
        next: (messages: string[]) => {
          this.isUploading = false;
          this.messageService.add({
            severity: 'success',
            summary: 'Archivo Enviado',
            detail: messages[0] || 'El archivo ha sido enviado exitosamente.',
          });
          this.listarArchivos();
          this.selectedFile = null; 
          this.progress = 0; 
        },
        error: () => {
          this.isUploading = false;
          this.messageService.add({
            severity: 'error',
            summary: 'Error',
            detail: 'No se pudo enviar el archivo.',
          });
        },
      });
    }
  }

  downloadArchivo(id: number, name: string) {
    if (id && id !== 0) {
      this.consolidadoService.getFileForPreview(id).subscribe((blob: Blob) => {
        const url = window.URL.createObjectURL(blob);
        const anchor = document.createElement('a');
        anchor.href = url;
        anchor.download = name;
        anchor.click();
        window.URL.revokeObjectURL(url);
      });
    } else if (this.selectedFile) {
      const url = window.URL.createObjectURL(this.selectedFile);
      const anchor = document.createElement('a');
      anchor.href = url;
      anchor.download = this.selectedFile.name;
      anchor.click();
      window.URL.revokeObjectURL(url);
    } else {
      this.messageService.add({
        severity: 'warn',
        summary: 'Descarga no disponible',
        detail: 'Este archivo aún no ha sido enviado.',
      });
    }
  }

  visualizarArchivoEnModal(id: number) {
    const archivoSeleccionado = this.archivos.find(
      (archivo) => archivo.id === id
    );

    if (archivoSeleccionado && archivoSeleccionado.type.includes('word')) {
      const fileUrl = encodeURIComponent(archivoSeleccionado.url); 
      this.archivoUrl = `https://view.officeapps.live.com/op/view.aspx?src=${fileUrl}`;
      this.modalVisible = true;
    } else if (id && id !== 0) {
      this.consolidadoService.getFileForPreview(id).subscribe((blob: Blob) => {
        this.archivoUrl = window.URL.createObjectURL(blob);
        this.modalVisible = true;
      });
    } else if (this.selectedFile) {
      this.archivoUrl = window.URL.createObjectURL(this.selectedFile);
      this.modalVisible = true;
    } else {
      this.messageService.add({
        severity: 'warn',
        summary: 'Visualización no disponible',
        detail: 'Este archivo aún no ha sido enviado.',
      });
    }
  }

  cerrarModal() {
    this.modalVisible = false;
    this.archivoUrl = null;
  }

  removeSelectedFile() {
    this.selectedFile = null;
    this.selectedFileType = '';

    if (this.fileInput) {
      this.fileInput.nativeElement.value = '';
    }
  }
}
