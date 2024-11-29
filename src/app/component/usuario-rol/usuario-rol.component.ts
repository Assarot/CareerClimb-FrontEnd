import { Component, OnInit } from '@angular/core';
import { TableModule } from 'primeng/table';
import { ButtonModule } from 'primeng/button';
import { DialogModule } from 'primeng/dialog';
import { InputTextModule } from 'primeng/inputtext';
import { ConfirmDialogModule } from 'primeng/confirmdialog';
import { ToastModule } from 'primeng/toast';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { UsuarioRolService } from '../../service/usuario-rol.service';
import { PersonaService } from '../../service/persona.service';
import { RolService } from '../../service/rol.service';
import { UsuarioService } from '../../service/usuario.service'; // Nuevo servicio para Usuario
import { ConfirmationService, MessageService } from 'primeng/api';
import { UsuarioRol } from '../../model/usuario-rol';
import { Persona } from '../../model/persona';
import { Rol } from '../../model/rol';
import { Usuario } from '../../model/usuario';
import { RegisterDto } from '../../dto/register-dto';
import { DropdownModule } from 'primeng/dropdown';
import { AuthService } from '../../auth.service';

@Component({
  selector: 'app-usuario-rol',
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
    DropdownModule,
    DropdownModule
  ],
  templateUrl: './usuario-rol.component.html',
  styleUrls: ['./usuario-rol.component.css'],
})
export class UsuarioRolComponent implements OnInit {
  usuarioRoles: UsuarioRol[] = [];
  usuarios: Usuario[] = [];
  personas: Persona[] = [];
  filteredPersonas: Persona[] = [];  // Array para almacenar las personas filtradas
  registers:RegisterDto=new RegisterDto(
    '',
    '',
    '',
    0
  );
  roles: Rol[] = [];
  usuarioRol: UsuarioRol = new UsuarioRol(
    0,
    new Usuario(0, '', '', '', new Persona(0, '', '', '', '', '')),
    new Rol(0, '', '')
  );
  visible: boolean = false;
  isEditing: boolean = false;
  totalRecords: number = 0;
  pageSize: number = 10; // Número de registros por página
  currentPage: number = 0; // Página actual

  constructor(
    private usuarioRolService: UsuarioRolService,
    private usuarioService: UsuarioService,
    private rolService: RolService,
    private messageService: MessageService,
    private confirmationService: ConfirmationService,
    private personaService: PersonaService,
    private authService: AuthService
  ) {}

  ngOnInit(): void {
    this.listarUsuariosRoles();
    this.listarUsuarios();
    this.listarRoles();
    this.listarPersonas();
  }

  // Método para listar todos los usuarios con el formato solicitado
  listarUsuariosRoles(): void {
    this.usuarioRolService.getUsuarioRoles().subscribe({
      next: (data: UsuarioRol[]) => {
        console.log('Datos recuperados: ', data); // Para depurar
        this.usuarioRoles = data; // Asegúrate de que esta variable tenga todos los registros
      },
      error: (error) => {
        console.error('Error al obtener los usuarios roles', error);
      },
    });
  }

  listarPersonas(): void {
    this.personaService.getPersonas().subscribe({
      next: (data: Persona[]) => {
        console.log('Datos recuperados: ', data);
        // Modificamos cada objeto de persona para agregarle el campo fullName concatenando nombres y apellidos
        this.personas = data.map(persona => ({
          ...persona,  // Mantiene las propiedades originales de cada persona
          fullName: `${persona.nombres} ${persona.apellidos}` // Creamos el fullName concatenando nombres y apellidos
        }));
        this.filteredPersonas = [...this.personas];  // Inicializamos el array filtrado
      },
      error: (error) => {
        console.error('Error al obtener las personas', error);
      },
    });
  }
  
  
  // Método para listar todos los usuarios
  listarUsuarios(): void {
    this.usuarioService.getUsuarios().subscribe({
      next: (data: Usuario[]) => {
        this.usuarios = data;
      },
      error: (error) => {
        console.error('Error al obtener los usuarios', error);
      },
    });
  }

  // Método para listar todos los roles
  listarRoles(): void {
    this.rolService.getRoles().subscribe({
      next: (data: Rol[]) => {
        this.roles = data;
        console.log('Roles cargados:', this.roles); // Verifica si los roles se cargan correctamente
      },
      error: (error) => {
        console.error('Error al obtener los roles', error);
      },
    });
  }

  // Mostrar el dialogo para crear un nuevo usuario
  showDialogCreate(): void {
    this.usuarioRol = new UsuarioRol(
      0,
      new Usuario(0, '', '', '', new Persona(0, '', '', '', '', '')),
      new Rol(0, '', '')
    );
    this.visible = true;
    this.isEditing = false;
  }

  // Mostrar el dialogo para editar un usuario
  showDialogEdit(id: number): void {
    this.usuarioRolService.getUsuarioRolId(id).subscribe({
      next: (data) => {
        this.usuarioRol = { ...data };
        this.visible = true;
        this.isEditing = true;
      },
      error: (error) => {
        console.error('Error al obtener el usuario rol', error);
      },
    });
  }

  guardarUsuarioRol(): void {
    const registerDto = {
      idPersona: this.registers.idPersona,
      roleName: this.registers.roleName,
      email: this.registers.email,
      password: this.registers.password
    };
  
    let request;
  
    // Si estamos en modo edición, usamos el servicio de edición, de lo contrario, creamos un nuevo usuario
    if (this.isEditing) {
      request = this.usuarioRolService.editarUsuarioRol(this.usuarioRol);  // Método para editar el rol del usuario
    } else {
      request = this.usuarioRolService.crearUsuarioRol(this.usuarioRol);  // Método para crear el rol del usuario
    }
  
    // Realizamos la petición HTTP (crear o editar)
    request.subscribe({
      next: (response) => {
        if (this.isEditing) {
          // Si estamos editando, actualizamos el registro en la lista
          const index = this.usuarioRoles.findIndex(
            (usuarioRol) => usuarioRol.idUsuarioRol === response.idUsuarioRol
          );
          if (index !== -1) {
            this.usuarioRoles[index] = response;  // Actualizamos el registro con los datos devueltos
          }
        } else {
          // Si estamos creando, agregamos el nuevo usuario al final de la lista
          this.usuarioRoles.push(response);  // Añadimos el nuevo usuario rol
        }
  
        // Mensaje de éxito
        this.messageService.add({
          severity: 'success',
          summary: 'Correcto',
          detail: this.isEditing ? 'Usuario Rol actualizado' : 'Usuario Rol creado',
        });
        
        this.visible = false;  // Cerramos el diálogo
      },
      error: (error) => {
        // Si hay un error, mostramos el mensaje de error
        console.error('Error al guardar el usuario rol', error);
        this.messageService.add({
          severity: 'error',
          summary: 'Error',
          detail: 'Ocurrió un error al guardar el usuario rol',
        });
      }
    });
  }
  
  

  // Método para eliminar un usuario
  deleteUsuarioRol(id: number): void {
    this.confirmationService.confirm({
      message: '¿Está seguro de eliminar este usuario?',
      header: 'Confirmación',
      icon: 'pi pi-exclamation-triangle',
      accept: () => {
        this.usuarioRolService.eliminarUsuarioRol(id).subscribe({
          next: () => {
            this.messageService.add({
              severity: 'success',
              summary: 'Correcto',
              detail: 'Usuario eliminado con éxito',
            });
            this.listarUsuariosRoles();
          },
          error: (error) => {
            console.error('Error al eliminar el usuario', error);
            this.messageService.add({
              severity: 'error',
              summary: 'Error',
              detail: 'Ocurrió un error al eliminar el usuario',
            });
          },
        });
      },
    });
  }
}
