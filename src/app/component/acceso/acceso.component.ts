import { Component } from '@angular/core';
import { Acceso } from '../../model/acceso';
import { AccesoService } from '../../service/acceso.service';
import { TableModule } from 'primeng/table';
import { ButtonModule } from 'primeng/button';
import { DialogModule } from 'primeng/dialog';
import { RouterModule } from '@angular/router';
import { InputTextModule } from 'primeng/inputtext';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ConfirmDialogModule } from 'primeng/confirmdialog';
import { ToastModule } from 'primeng/toast';
import { DropdownModule } from 'primeng/dropdown';
import { CommonModule } from '@angular/common';
import { ConfirmationService, MessageService } from 'primeng/api';
import { RolService } from '../../service/rol.service';
import { Rol } from '../../model/rol';
import { AccesoRol } from '../../model/acceso-rol';
import { AccesoRolService } from '../../service/acceso-rol.service';

@Component({
  selector: 'app-acceso',
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
    ReactiveFormsModule
  ],
  templateUrl: './acceso.component.html',
  styleUrl: './acceso.component.css',
})
export class AccesoComponent {
  accesos: Acceso[] = [];
  // roles: Rol[] = [];
  // accesosRoles: AccesoRol[] = [];
  acceso: Acceso = new Acceso(0, '', '', '', 'A', undefined, [], false);
  opcionesAccesoPadre: { idAcceso: number; titulo: string }[] = [];
  selectedAccesoPadreId: number | null = null;
  // accesoRol: AccesoRol = new AccesoRol();
  // rol: Rol = new Rol(0, '', '');
  visible: boolean = false;
  isEditing: boolean = false;

  constructor(
    private accesoService: AccesoService,
    private messageService: MessageService,
    private confirmationService: ConfirmationService,
    // private rolService: RolService,
    // private accesoRolService: AccesoRolService
  ) {}

  ngOnInit() {
    this.listarAccesos();
    // this.listarRoles();
    this.listarAccesosPadres(); 
  }

  listarAccesos(): void {
    this.accesoService.getAccesos().subscribe((data) => {
      this.accesos = data.sort((a, b) => a.idAcceso - b.idAcceso); // Ordena por idAcceso de menor a mayor
    });
  }

  listarAccesosPadres(): void {
    this.accesoService.getAccesos().subscribe({
      next: (data) => {
        this.opcionesAccesoPadre = data.map((acceso) => ({
          idAcceso: acceso.idAcceso,
          titulo: acceso.titulo,
        }));
      },
      error: (err) => {
        console.error('Error al obtener accesos padres:', err);
      },
    });
  }
  
  
  
  actualizarAccesoPadre(idAccesoSeleccionado: number): void {
    if (idAccesoSeleccionado) {
      this.acceso.accesoPadre = { idAcceso: idAccesoSeleccionado }; 
    } else {
      this.acceso.accesoPadre = undefined; 
    }
  }
  
  
  

  // listarRoles(): void {
  //   this.rolService.getRoles().subscribe((data) => {
  //     this.roles = data.sort((a, b) => a.idRol - b.idRol); // Ordena por idRol de menor a mayor
  //   });
  // }

  // listarAccesosRoles(): void {
  //   this.accesoRolService.getAccesoRoles().subscribe((data) => {
  //     this.accesosRoles = data.sort((a, b) => a.idAccesoRol - b.idAccesoRol);
  //   });
  // }

  showDialogCreate(): void {
    this.visible = true;
    this.acceso = new Acceso(0, '', '', '', 'A', null, [], false);
    this.selectedAccesoPadreId = null; 
    this.isEditing = false;
  }
  

  showDialogEdit(id: number): void {
    this.accesoService.getAccesoById(id).subscribe({
      next: (data) => {
        this.acceso = new Acceso(
          data.idAcceso,
          data.titulo,
          data.url,
          data.icono,
          data.isActive,
          data.accesoPadre ? { idAcceso: data.accesoPadre.idAcceso } : null,
          data.subAccesos || [],
          data.isExpanded
        );
        this.selectedAccesoPadreId = data.accesoPadre?.idAcceso || null; 
        this.visible = true;
        this.isEditing = true;
      },
      error: (error) => console.error('Error al cargar el acceso:', error),
    });
  }
  
  

  deleteAcceso(id: number): void {
    this.confirmationService.confirm({
      message: '¿Está seguro de eliminar este acceso?',
      header: 'Confirmación',
      icon: 'pi pi-exclamation-triangle',
      accept: () => {
        this.accesoService.eliminarAcceso(id).subscribe({
          next: () => {
            this.messageService.add({
              severity: 'success',
              summary: 'Correcto',
              detail: 'Acceso eliminado con éxito',
            });
            this.listarAccesos();
          },
          error: () =>
            this.messageService.add({
              severity: 'error',
              summary: 'Error',
              detail: 'Error al eliminar el acceso',
            }),
        });
      },
    });
  }
  
  guardarAcceso(): void {
    const accesoParaGuardar = { ...this.acceso };
  
    accesoParaGuardar.accesoPadre = this.selectedAccesoPadreId
      ? { idAcceso: this.selectedAccesoPadreId }
      : null; 
  
    delete accesoParaGuardar.subAccesos;
    delete accesoParaGuardar.isExpanded;
  
    console.log('Objeto enviado:', accesoParaGuardar);
  
    const request = this.isEditing
      ? this.accesoService.editarAcceso(accesoParaGuardar)
      : this.accesoService.crearAcceso(accesoParaGuardar);
  
    request.subscribe({
      next: () => {
        this.messageService.add({
          severity: 'success',
          summary: 'Correcto',
          detail: this.isEditing ? 'Acceso actualizado' : 'Acceso creado',
        });
        this.listarAccesos(); 
        this.visible = false; 
      },
      error: (err) => {
        console.error('Error al guardar acceso:', err);
        this.messageService.add({
          severity: 'error',
          summary: 'Error',
          detail: 'Ocurrió un error al guardar el acceso',
        });
      },
    });
  }
  
  

  
}
