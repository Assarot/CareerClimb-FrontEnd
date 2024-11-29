import { Component } from '@angular/core';
import { TableModule } from 'primeng/table';
import { ButtonModule } from 'primeng/button';
import { DialogModule } from 'primeng/dialog';
import { InputTextModule } from 'primeng/inputtext';
import { ConfirmDialogModule } from 'primeng/confirmdialog';
import { ToastModule } from 'primeng/toast';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { Carrera } from '../../model/carrera';
import { CarreraService } from '../../service/carrera.service';
import { ConfirmationService, MessageService } from 'primeng/api';

@Component({
  selector: 'app-carrera',
  standalone: true,
  imports: [
    TableModule,
    ButtonModule,
    DialogModule,
    InputTextModule,
    ConfirmDialogModule,
    ToastModule,
    FormsModule,
    CommonModule,
  ],
  templateUrl: './carrera.component.html',
  styleUrls: ['./carrera.component.css'],
})
export class CarreraComponent {
  carreras: Carrera[] = [];
  carrera: Carrera = new Carrera(0, '', '', 0, '');
  visible: boolean = false;
  isEditing: boolean = false;

  constructor(
    private carreraService: CarreraService,
    private messageService: MessageService,
    private confirmationService: ConfirmationService
  ) {}

  ngOnInit(): void {
    this.listarCarreras();
  }

  listarCarreras(): void {
    this.carreraService.getCarreras().subscribe({
      next: (data: Carrera[]) => {
        this.carreras = data.sort((a, b) => a.idCarrera - b.idCarrera);
      },
      error: (error) => {
        console.error('Error al obtener las carreras', error);
      },
    });
  }

  showDialogCreate(): void {
    this.carrera = new Carrera(0, '', '', 0, ''); 
    this.visible = true;
    this.isEditing = false;
  }

  showDialogEdit(id: number): void {
    this.carreraService.getCarreraById(id).subscribe({
      next: (data) => {
        this.carrera = { ...data }; 
        this.visible = true;
        this.isEditing = true;
      },
      error: (error) => {
        console.error('Error al obtener la carrera', error);
      },
    });
  }

  guardarCarrera(): void {
    const request = this.isEditing
      ? this.carreraService.editarCarrera(this.carrera)
      : this.carreraService.crearCarrera(this.carrera);

    request.subscribe({
      next: () => {
        this.messageService.add({
          severity: 'success',
          summary: 'Correcto',
          detail: this.isEditing ? 'Carrera actualizada' : 'Carrera creada',
        });
        this.listarCarreras();
        this.visible = false;
      },
      error: (error) => {
        console.error('Error al guardar la carrera', error);
        this.messageService.add({
          severity: 'error',
          summary: 'Error',
          detail: 'Ocurrió un error al guardar la carrera',
        });
      },
    });
  }

  deleteCarrera(id: number): void {
    this.confirmationService.confirm({
      message: '¿Está seguro de eliminar esta carrera?',
      header: 'Confirmación',
      icon: 'pi pi-exclamation-triangle',
      accept: () => {
        this.carreraService.eliminarCarrera(id).subscribe({
          next: () => {
            this.messageService.add({
              severity: 'success',
              summary: 'Correcto',
              detail: 'Carrera eliminada con éxito',
            });
            this.listarCarreras();
          },
          error: (error) => {
            console.error('Error al eliminar la carrera', error);
            this.messageService.add({
              severity: 'error',
              summary: 'Error',
              detail: 'Ocurrió un error al eliminar la carrera',
            });
          },
        });
      },
    });
  }
}
