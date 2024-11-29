import { Component, OnInit } from '@angular/core';
import { TableModule } from 'primeng/table';
import { ButtonModule } from 'primeng/button';
import { DialogModule } from 'primeng/dialog';
import { InputTextModule } from 'primeng/inputtext';
import { ConfirmDialogModule } from 'primeng/confirmdialog';
import { ToastModule } from 'primeng/toast';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CommonModule, NgFor } from '@angular/common';
import { AccesoRol } from '../../model/acceso-rol';
import { Acceso } from '../../model/acceso';
import { Rol } from '../../model/rol';
import { AccesoRolService } from '../../service/acceso-rol.service';
import { AccesoService } from '../../service/acceso.service';
import { RolService } from '../../service/rol.service';
import { MessageService, ConfirmationService } from 'primeng/api';
import { DropdownModule } from 'primeng/dropdown';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-acceso-rol',
  standalone: true,
  imports: [
    TableModule,
    ButtonModule,
    DialogModule,
    RouterModule,
    InputTextModule,
    FormsModule,
    ConfirmDialogModule,
    ToastModule,
    DropdownModule,
    CommonModule,
    ReactiveFormsModule,
  ],
  templateUrl: './acceso-rol.component.html',
  styleUrls: ['./acceso-rol.component.css'],
})
export class AccesoRolComponent implements OnInit {
  relaciones: AccesoRol[] = [];
  accesos: Acceso[] = [];
  roles: Rol[] = [];

  // Modelo inicial corregido
  relacion: AccesoRol = new AccesoRol(
    0,
    new Rol(0, '', ''),
    new Acceso(0, '', '', '', 'A', undefined, [], false)
  );

  visible: boolean = false;
  isEditing: boolean = false;

  constructor(
    private accesoRolService: AccesoRolService,
    private accesoService: AccesoService,
    private rolService: RolService,
    private messageService: MessageService,
    private confirmationService: ConfirmationService
  ) {}

  ngOnInit(): void {
    this.listarRelaciones();
    this.listarAccesos();
    this.listarRoles();
  }

  listarRelaciones(): void {
    this.accesoRolService.getAccesoRoles().subscribe({
      next: (data) => {
        console.log('Datos recibidos del backend:', data); // Debug inicial
        this.relaciones = data.map((item) => {
          console.log('Elemento actual:', item); // Verifica cada elemento individual
          return new AccesoRol(
            item.idAccesoRol, // Confirma que este campo existe
            new Rol(item.rol.idRol, item.rol.nombre, item.rol.isActive),
            new Acceso(
              item.acceso.idAcceso,
              item.acceso.titulo,
              item.acceso.url,
              item.acceso.icono,
              item.acceso.isActive,
              item.acceso.accesoPadre || null,
              item.acceso.subAccesos || [],
              item.acceso.isExpanded || false
            )
          );
        });
        console.log('Relaciones transformadas:', this.relaciones); // Debug transformado
      },
      error: (err) => console.error('Error al cargar relaciones', err),
    });
  }

  listarAccesos(): void {
    this.accesoService.getAccesos().subscribe({
      next: (data) => (this.accesos = data),
      error: (err) => console.error('Error al cargar accesos', err),
    });
  }

  listarRoles(): void {
    this.rolService.getRoles().subscribe({
      next: (data) => (this.roles = data),
      error: (err) => console.error('Error al cargar roles', err),
    });
  }

  showDialogCreate(): void {
    this.relacion = new AccesoRol(
      0,
      new Rol(0, '', ''),
      new Acceso(0, '', '', '', 'A', undefined, [], false)
    );
    this.visible = true;
    this.isEditing = false;
  }

  guardarRelacion(): void {
    const request = this.isEditing
      ? this.accesoRolService.editarAccesoRol(this.relacion)
      : this.accesoRolService.crearAccesoRol(this.relacion);

    request.subscribe({
      next: () => {
        this.messageService.add({
          severity: 'success',
          summary: 'Correcto',
          detail: this.isEditing
            ? 'Relación actualizada'
            : 'Relación creada con éxito',
        });
        this.listarRelaciones();
        this.visible = false;
      },
      error: (err) => console.error('Error al guardar relación', err),
    });
  }

  deleteRelacion(id: number): void {
    this.confirmationService.confirm({
      message: '¿Está seguro de eliminar esta relación?',
      header: 'Confirmación',
      icon: 'pi pi-exclamation-triangle',
      accept: () => {
        this.accesoRolService.eliminarAccesoRol(id).subscribe({
          next: (response) => {
            console.log('Eliminación exitosa:', response); // Verifica la respuesta del backend
            this.messageService.add({
              severity: 'success',
              summary: 'Correcto',
              detail: 'Relación eliminada',
            });
            this.listarRelaciones();
          },
          error: (err) => {
            console.error('Error al eliminar relación', err);
            this.messageService.add({
              severity: 'error',
              summary: 'Error',
              detail: 'No se pudo eliminar la relación',
            });
          },
        });
      },
    });
  }
}
