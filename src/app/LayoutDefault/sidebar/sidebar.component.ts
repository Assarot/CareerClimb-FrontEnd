import { NgClass, NgFor, NgIf } from '@angular/common';
import { Component, EventEmitter, Output } from '@angular/core';
import { RouterLink, RouterModule, Router } from '@angular/router';
import { AuthService } from '../../auth.service';
import { Acceso } from '../../model/acceso';
import { AccesoService } from '../../service/acceso.service';

@Component({
  selector: 'app-sidebar',
  standalone: true,
  imports: [RouterLink, RouterModule, NgIf, NgClass, NgFor],
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.css'], // Ajusta el plural aquí
})
export class SidebarComponent {
  isCollapsed = false;
  accesos: Acceso[] = [];
  rolSinPrefijo: string = '';

  constructor(
    private authService: AuthService,
    private router: Router,
    private accesoService: AccesoService
  ) {}

  toggleSubAccesos(acceso: Acceso): void {
    acceso.isExpanded = !acceso.isExpanded;
  }
  
  /**
   * @param url URL del subacceso seleccionado.
   */
  navigateTo(url: string): void {
    if (url) {
      this.router.navigate([url]);
    }
  }

  @Output() toggle = new EventEmitter<boolean>();

  toggleSidebar() {
    this.isCollapsed = !this.isCollapsed;
    this.toggle.emit(this.isCollapsed);
  }

  ngOnInit(): void {
    const roles = this.authService.getRolesSinPrefijo();
    if (roles.length > 0) {
      this.rolSinPrefijo = roles[0]; 
      this.obtenerAccesosPorRol(this.rolSinPrefijo);
    } else {
      console.error('No se encontraron roles en el token.');
    }
  }

  /**
   * 
   * @param rol Rol del usuario.
   */
  obtenerAccesosPorRol(rol: string): void {
    this.accesoService.getAccesosPorRol(rol).subscribe({
      next: (data: Acceso[]) => {
        this.accesos = this.organizarAccesos(data);
        console.log('Accesos obtenidos:', this.accesos);
      },
      error: (err: any) => { 
        console.error('Error al obtener accesos por rol:', err);
      },
    });
  }
  

  /**
   * @param accesos 
   * @returns
   */
  private organizarAccesos(accesos: Acceso[]): Acceso[] {
    const accesoMap = new Map<number, Acceso>();
  
    accesos.forEach((acceso) => {
      acceso.subAccesos = []; 
      accesoMap.set(acceso.idAcceso, acceso);
    });
  
    const accesosPrincipales: Acceso[] = [];
  
    accesos.forEach((acceso) => {
      if (acceso.accesoPadre) {
        const padreId = typeof acceso.accesoPadre === 'number'
          ? acceso.accesoPadre
          : acceso.accesoPadre.idAcceso;
  
        const padre = accesoMap.get(padreId);
        if (padre) {
          padre.subAccesos = padre.subAccesos || [];
          padre.subAccesos.push(acceso);
          padre.subAccesos.sort((a, b) => a.idAcceso - b.idAcceso); 
        }
      } else {
        accesosPrincipales.push(acceso);
      }
    });
  
    return accesosPrincipales.sort((a, b) => a.idAcceso - b.idAcceso);
  }
  



  logout() {
    this.authService.logout();
  }

  onSubaccesoChange(event: Event): void {
    const selectElement = event.target as HTMLSelectElement;
    const selectedUrl = selectElement.value;
  
    if (selectedUrl) {
      this.navigateTo(selectedUrl); 
    }
  }
  
}
