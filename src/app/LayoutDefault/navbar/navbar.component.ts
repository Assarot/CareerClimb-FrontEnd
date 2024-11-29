import { NgIf } from '@angular/common';
import { Component, Input } from '@angular/core';
import { AuthService } from '../../auth.service';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-navbar',
  standalone: true,
  imports: [NgIf,RouterLink],
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent {
  fullName: string | null = null;
  constructor(private authService: AuthService) {}
  @Input() isCollapsed: boolean = false;

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

  ngOnInit() {
      this.fullName = this.authService.getFullName();
  }
}
