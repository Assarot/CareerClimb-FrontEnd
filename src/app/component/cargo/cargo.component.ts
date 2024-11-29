import { Component } from '@angular/core';
import { TableModule } from 'primeng/table';
import { ButtonModule } from 'primeng/button';
import { DialogModule } from 'primeng/dialog';
import { InputTextModule } from 'primeng/inputtext';
import { ConfirmDialogModule } from 'primeng/confirmdialog';
import { ToastModule } from 'primeng/toast';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { Cargo } from '../../model/cargo';
import { CargoService } from '../../service/cargo.service';
import { ConfirmationService, MessageService } from 'primeng/api';

@Component({
  selector: 'app-cargo',
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
  templateUrl: './cargo.component.html',
  styleUrls: ['./cargo.component.css'],
})
export class CargoComponent {
  cargos: Cargo[] = [];
  cargo: Cargo = new Cargo(0, '', ''); // Modelo inicial
  visible: boolean = false;
  isEditing: boolean = false;

  constructor(
    private cargoService: CargoService,
    private messageService: MessageService,
    private confirmationService: ConfirmationService
  ) {}

  ngOnInit(): void {
    this.listarCargos();
  }

  listarCargos(): void {
    this.cargoService.getCargos().subscribe({
      next: (data: Cargo[]) => {
        this.cargos = data.sort((a, b) => a.idCargo - b.idCargo); // Ordena por ID
      },
      error: (error) => {
        console.error('Error al obtener los cargos', error);
      },
    });
  }

  showDialogCreate(): void {
    this.cargo = new Cargo(0, '', ''); // Inicializa el modelo vacío
    this.visible = true;
    this.isEditing = false;
  }

  showDialogEdit(id: number): void {
    this.cargoService.getCargoById(id).subscribe({
      next: (data) => {
        this.cargo = { ...data }; // Asigna datos del backend
        this.visible = true;
        this.isEditing = true;
      },
      error: (error) => {
        console.error('Error al obtener el cargo', error);
      },
    });
  }

  guardarCargo(): void {
    const request = this.isEditing
      ? this.cargoService.editarCargo(this.cargo)
      : this.cargoService.crearCargo(this.cargo);

    request.subscribe({
      next: () => {
        this.messageService.add({
          severity: 'success',
          summary: 'Correcto',
          detail: this.isEditing ? 'Cargo actualizado' : 'Cargo creado',
        });
        this.listarCargos();
        this.visible = false;
      },
      error: (error) => {
        console.error('Error al guardar el cargo', error);
        this.messageService.add({
          severity: 'error',
          summary: 'Error',
          detail: 'Ocurrió un error al guardar el cargo',
        });
      },
    });
  }

  deleteCargo(id: number): void {
    this.confirmationService.confirm({
      message: '¿Está seguro de eliminar este cargo?',
      header: 'Confirmación',
      icon: 'pi pi-exclamation-triangle',
      accept: () => {
        this.cargoService.eliminarCargo(id).subscribe({
          next: () => {
            this.messageService.add({
              severity: 'success',
              summary: 'Correcto',
              detail: 'Cargo eliminado con éxito',
            });
            this.listarCargos();
          },
          error: (error) => {
            console.error('Error al eliminar el cargo', error);
            this.messageService.add({
              severity: 'error',
              summary: 'Error',
              detail: 'Ocurrió un error al eliminar el cargo',
            });
          },
        });
      },
    });
  }
}
