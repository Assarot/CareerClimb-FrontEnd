import { Component } from '@angular/core';
import { Router, RouterLink } from '@angular/router';
import { AuthService } from '../auth.service';
import {NgIf } from '@angular/common';

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [RouterLink,NgIf],
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.css'
})
export class DashboardComponent {
  fullName: string | null = null;
  constructor(private authService: AuthService, private router: Router) {}

  ngOnInit() {
    this.fullName = this.authService.getFullName();
}

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

  Logout() {
    this.authService.logout();
  }
  
  
}
