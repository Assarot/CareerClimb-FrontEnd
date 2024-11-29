import { Component } from '@angular/core';
import { TableModule } from 'primeng/table';
import { ButtonModule } from 'primeng/button';
import { DialogModule } from 'primeng/dialog';
import { InputTextModule } from 'primeng/inputtext';
import { ConfirmDialogModule } from 'primeng/confirmdialog';
import { ToastModule } from 'primeng/toast';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { Rol } from '../../model/rol';
import { RolService } from '../../service/rol.service';
import { CargoService } from '../../service/cargo.service';
import { ConfirmationService, MessageService } from 'primeng/api';

@Component({
  selector: 'app-rol',
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
  templateUrl: './rol.component.html',
  styleUrls: ['./rol.component.css'],
})
export class RolComponent {
  roles: Rol[] = [];
  rol: Rol = new Rol(0, '', ''); // Modelo inicial para crear/editar
  visible: boolean = false;
  isEditing: boolean = false;

  constructor(
    private rolService: RolService,
    private cargoService: CargoService, // Servicio para manejar cargos
    private messageService: MessageService,
    private confirmationService: ConfirmationService
  ) {}

  ngOnInit(): void {
    this.listarRoles();
  }

  listarRoles(): void {
    this.rolService.getRoles().subscribe({
      next: (data: Rol[]) => {
        this.roles = data.sort((a, b) => a.idRol - b.idRol); // Ordena por ID
      },
      error: (error) => {
        console.error('Error al obtener los roles', error);
      },
    });
  }

  showDialogCreate(): void {
    this.rol = new Rol(0, '', ''); // Inicializa el modelo vacío
    this.visible = true;
    this.isEditing = false;
  }

  showDialogEdit(id: number): void {
    this.rolService.getRolId(id).subscribe({
      next: (data) => {
        this.rol = { ...data }; // Asigna los datos del backend
        this.visible = true;
        this.isEditing = true;
      },
      error: (error) => {
        console.error('Error al obtener el rol', error);
      },
    });
  }

  guardarRol(): void {
    // Aplica el formato requerido para el nombre del Rol
    this.rol.nombre = this.rol.nombre.toUpperCase();

    const request = this.isEditing
      ? this.rolService.editarRol(this.rol)
      : this.rolService.crearRol(this.rol);

    request.subscribe({
      next: () => {
        if (this.isEditing) {
          this.actualizarCargo();
        } else {
          this.crearCargo();
        }
        this.messageService.add({
          severity: 'success',
          summary: 'Correcto',
          detail: this.isEditing
            ? 'Rol y Cargo actualizados'
            : 'Rol y Cargo creados',
        });
        this.listarRoles();
        this.visible = false;
      },
      error: (error) => {
        console.error('Error al guardar el rol', error);
        this.messageService.add({
          severity: 'error',
          summary: 'Error',
          detail: 'Ocurrió un error al guardar el rol',
        });
      },
    });
  }

  crearCargo(): void {
    const cargoNombre = this.formatearCargoNombre(this.rol.nombre); // Formatea el nombre del Cargo

    this.cargoService
      .crearCargo({
        idCargo: this.rol.idRol, // Usa el mismo ID
        nombre: cargoNombre,
        isActive: this.rol.isActive,
      })
      .subscribe({
        next: () => {
          console.log('Cargo creado junto con el Rol');
        },
        error: (error) => {
          console.error('Error al guardar el cargo', error);
          this.messageService.add({
            severity: 'warn',
            summary: 'Advertencia',
            detail:
              'Ocurrió un error al crear el Cargo, pero el Rol fue guardado',
          });
        },
      });
  }

  actualizarCargo(): void {
    const cargoNombre = this.formatearCargoNombre(this.rol.nombre); // Formatea el nombre del Cargo

    this.cargoService
      .editarCargo({
        idCargo: this.rol.idRol, // Usa el mismo ID
        nombre: cargoNombre,
        isActive: this.rol.isActive,
      })
      .subscribe({
        next: () => {
          console.log('Cargo actualizado junto con el Rol');
        },
        error: (error) => {
          console.error('Error al actualizar el cargo', error);
          this.messageService.add({
            severity: 'warn',
            summary: 'Advertencia',
            detail:
              'Ocurrió un error al actualizar el Cargo, pero el Rol fue guardado',
          });
        },
      });
  }

  deleteRol(id: number): void {
    this.confirmationService.confirm({
      message: '¿Está seguro de eliminar este rol y su cargo asociado?',
      header: 'Confirmación',
      icon: 'pi pi-exclamation-triangle',
      accept: () => {
        this.rolService.eliminarRol(id).subscribe({
          next: () => {
            this.eliminarCargo(id); // Llama a eliminar el cargo con el mismo ID
            this.messageService.add({
              severity: 'success',
              summary: 'Correcto',
              detail: 'Rol y Cargo eliminados con éxito',
            });
            this.listarRoles();
          },
          error: (error) => {
            console.error('Error al eliminar el rol', error);
            this.messageService.add({
              severity: 'error',
              summary: 'Error',
              detail: 'Ocurrió un error al eliminar el rol',
            });
          },
        });
      },
    });
  }

  eliminarCargo(id: number): void {
    this.cargoService.eliminarCargo(id).subscribe({
      next: () => {
        console.log('Cargo eliminado junto con el Rol');
      },
      error: (error) => {
        console.error('Error al eliminar el cargo', error);
        this.messageService.add({
          severity: 'warn',
          summary: 'Advertencia',
          detail:
            'Ocurrió un error al eliminar el Cargo, pero el Rol fue eliminado',
        });
      },
    });
  }

  private formatearCargoNombre(nombre: string): string {
    // Convierte el nombre a "Primera letra mayúscula, resto minúsculas"
    return nombre.charAt(0).toUpperCase() + nombre.slice(1).toLowerCase();
  }
}
