import { Component } from '@angular/core';
import { AuthService } from '../auth.service';
import { NgIf, NgStyle } from '@angular/common';
import { ButtonModule } from 'primeng/button';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [NgIf, ButtonModule,NgStyle],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})
export class HomeComponent {
  backgroundImageUrl: string = '/assets/defaultBackground.png';
  ngOnInit(): void {
    this.setBackgroundImage();
  }
  constructor(private authService: AuthService) {}
  get isStudent(): boolean {
    return this.authService.hasRole('ROLE_ESTUDIANTE');
  }
  
  get isCoordinatorPPP(): boolean {
    return this.authService.hasRole('ROLE_COORDINADORPPP');
  }
  
  get isSupervisor(): boolean {
    return this.authService.hasRole('ROLE_SUPERVISOR');
  }
  
  get isSecretary(): boolean {
    return this.authService.hasRole('ROLE_SECRETARIA');
    }
    get isAdmin(): boolean {
      return this.authService.hasRole('ROLE_ADMIN');
  }

  // Función para establecer la imagen de fondo según el rol
  setBackgroundImage(): void {
    if (this.isStudent) {
      this.backgroundImageUrl = '/assets/estudianteHome.png'; // Imagen para estudiantes
    } else if (this.isCoordinatorPPP) {
      this.backgroundImageUrl = '/assets/secretariaHome.png'; // Imagen para coordinadores
    } else if (this.isSupervisor) {
      this.backgroundImageUrl = '/assets/supervisorHome.png'; // Imagen para supervisores
    } else if (this.isSecretary) {
      this.backgroundImageUrl = '/assets/secretariaBackground.png'; // Imagen para secretarias
    } else if (this.isAdmin) {
      this.backgroundImageUrl = '/assets/supervisorHome.png'; // Imagen para admins
    } else {
      this.backgroundImageUrl = '/assets/login.png'; // Imagen por defecto si no tiene rol
    }
  }
}
