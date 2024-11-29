import { Component, OnInit } from '@angular/core';
import { PersonaService } from '../../service/persona.service';
import { MessageService, ConfirmationService } from 'primeng/api';
import { Persona } from '../../model/persona';
import { TableModule } from 'primeng/table';
import { ButtonModule } from 'primeng/button';
import { DialogModule } from 'primeng/dialog';
import { InputTextModule } from 'primeng/inputtext';
import { ConfirmDialogModule } from 'primeng/confirmdialog';
import { ToastModule } from 'primeng/toast';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

@Component({
  standalone: true,
  selector: 'app-persona',
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
  templateUrl: './persona.component.html',
  styleUrls: ['./persona.component.css'],
})
export class PersonaComponent implements OnInit {
  personas: Persona[] = [];
  persona: Persona = new Persona(0, '', '', '', '', ''); // Modelo de persona
  visible: boolean = false;
  isEditing: boolean = false;
  pageSize: number = 10;
  totalRecords: number = 0;

  constructor(
    private personaService: PersonaService,
    private messageService: MessageService,
    private confirmationService: ConfirmationService
  ) {}

  ngOnInit(): void {
    this.listarPersonas();
  }

  // Obtener todas las personas
  listarPersonas(): void {
    this.personaService.getPersonas().subscribe({
      next: (data: Persona[]) => {
        this.personas = data;
      },
      error: (error) => {
        console.error('Error al obtener las personas', error);
      },
    });
  }

  // Mostrar el diálogo para crear una nueva persona
  showDialogCreate(): void {
    this.persona = new Persona(0, '', '', '', '', ''); // Reiniciar persona
    this.visible = true;
    this.isEditing = false;
  }

  // Mostrar el diálogo para editar una persona
  showDialogEdit(id: number): void {
    this.personaService.getPersonaById(id).subscribe({
      next: (data: Persona) => {
        this.persona = { ...data };
        this.visible = true;
        this.isEditing = true;
      },
      error: (error) => {
        console.error('Error al obtener la persona', error);
      },
    });
  }

  // Guardar persona (crear o actualizar)
  guardarPersona(): void {
    const request = this.isEditing
      ? this.personaService.editarPersona(this.persona)
      : this.personaService.crearPersona(this.persona);

    request.subscribe({
      next: (data) => {
        // Si es creación, agregamos la nueva persona al final de la lista
        if (!this.isEditing) {
          this.personas.push(data); // Agregar al final de la lista
        } else {
          // Si estamos editando, actualizamos el registro en la lista
          const index = this.personas.findIndex(
            (p) => p.idPersona === data.idPersona
          );
          if (index !== -1) {
            this.personas[index] = data;
          }
        }

        this.messageService.add({
          severity: 'success',
          summary: 'Correcto',
          detail: this.isEditing ? 'Persona actualizada' : 'Persona creada',
        });
        this.visible = false; // Cerramos el diálogo
      },
      error: (error) => {
        console.error('Error al guardar la persona', error);
        this.messageService.add({
          severity: 'error',
          summary: 'Error',
          detail: 'Ocurrió un error al guardar la persona',
        });
      },
    });
  }

  // Eliminar persona
  deletePersona(id: number): void {
    this.confirmationService.confirm({
      message: '¿Está seguro de eliminar esta persona?',
      header: 'Confirmación',
      icon: 'pi pi-exclamation-triangle',
      accept: () => {
        this.personaService.eliminarPersona(id).subscribe({
          next: () => {
            this.messageService.add({
              severity: 'success',
              summary: 'Correcto',
              detail: 'Persona eliminada con éxito',
            });
            this.listarPersonas(); // Recargamos la lista de personas
          },
          error: (error) => {
            console.error('Error al eliminar la persona', error);
            this.messageService.add({
              severity: 'error',
              summary: 'Error',
              detail: 'Ocurrió un error al eliminar la persona',
            });
          },
        });
      },
    });
  }
}
