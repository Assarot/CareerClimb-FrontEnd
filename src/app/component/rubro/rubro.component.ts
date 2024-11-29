import { Component } from '@angular/core';
import { TableModule } from 'primeng/table';
import { ButtonModule } from 'primeng/button';
import { DialogModule } from 'primeng/dialog';
import { InputTextModule } from 'primeng/inputtext';
import { ConfirmDialogModule } from 'primeng/confirmdialog';
import { ToastModule } from 'primeng/toast';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { Rubro } from '../../model/rubro';
import { RubroService } from '../../service/rubro.service';
import { ConfirmationService, MessageService } from 'primeng/api';

@Component({
  selector: 'app-rubro',
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
  templateUrl: './rubro.component.html',
  styleUrls: ['./rubro.component.css'],
})
export class RubroComponent {
  rubros: Rubro[] = [];
  rubro: Rubro = new Rubro(0, '', '', 0, ''); // Modelo inicial
  visible: boolean = false;
  isEditing: boolean = false;

  constructor(
    private rubroService: RubroService,
    private messageService: MessageService,
    private confirmationService: ConfirmationService
  ) {}

  ngOnInit(): void {
    this.listarRubros();
  }

  listarRubros(): void {
    this.rubroService.getRubros().subscribe({
      next: (data: Rubro[]) => {
        this.rubros = data.sort((a, b) => a.idRubro - b.idRubro); // Ordena por ID
      },
      error: (error) => {
        console.error('Error al obtener los rubros', error);
      },
    });
  }

  showDialogCreate(): void {
    this.rubro = new Rubro(0, '', '', 0, ''); // Inicializa el modelo vacío
    this.visible = true;
    this.isEditing = false;
  }

  showDialogEdit(id: number): void {
    this.rubroService.getRubroId(id).subscribe({
      next: (data) => {
        this.rubro = { ...data }; // Asigna datos del backend
        this.visible = true;
        this.isEditing = true;
      },
      error: (error) => {
        console.error('Error al obtener el rubro', error);
      },
    });
  }

  guardarRubro(): void {
    const request = this.isEditing
      ? this.rubroService.editarRubro(this.rubro)
      : this.rubroService.crearRubro(this.rubro);

    request.subscribe({
      next: () => {
        this.messageService.add({
          severity: 'success',
          summary: 'Correcto',
          detail: this.isEditing ? 'Rubro actualizado' : 'Rubro creado',
        });
        this.listarRubros();
        this.visible = false;
      },
      error: (error) => {
        console.error('Error al guardar el rubro', error);
        this.messageService.add({
          severity: 'error',
          summary: 'Error',
          detail: 'Ocurrió un error al guardar el rubro',
        });
      },
    });
  }

  deleteRubro(id: number): void {
    this.confirmationService.confirm({
      message: '¿Está seguro de eliminar este rubro?',
      header: 'Confirmación',
      icon: 'pi pi-exclamation-triangle',
      accept: () => {
        this.rubroService.eliminarRubro(id).subscribe({
          next: () => {
            this.messageService.add({
              severity: 'success',
              summary: 'Correcto',
              detail: 'Rubro eliminado con éxito',
            });
            this.listarRubros();
          },
          error: (error) => {
            console.error('Error al eliminar el rubro', error);
            this.messageService.add({
              severity: 'error',
              summary: 'Error',
              detail: 'Ocurrió un error al eliminar el rubro',
            });
          },
        });
      },
    });
  }
}
