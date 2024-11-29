import { Component } from '@angular/core';
import { trigger, transition, style, animate } from '@angular/animations';
import { AccesoRolComponent } from '../acceso-rol/acceso-rol.component';
import { AccesoComponent } from '../acceso/acceso.component';
import { RolComponent } from '../rol/rol.component';
import { NgFor, NgIf } from '@angular/common';

@Component({
  standalone: true,
  selector: 'app-gestion-accesos-roles',
  imports: [AccesoRolComponent, AccesoComponent, RolComponent, NgIf, NgFor],
  templateUrl: './gestion-accesos-roles.component.html',
  styleUrls: ['./gestion-accesos-roles.component.css'],
  animations: [
    trigger('slideAnimation', [
      transition('left => right', [
        style({ transform: 'translateX(-100%)', opacity: 0 }),
        animate(
          '300ms ease-out',
          style({ transform: 'translateX(0)', opacity: 1 })
        ),
      ]),
      transition('right => left', [
        style({ transform: 'translateX(100%)', opacity: 0 }),
        animate(
          '300ms ease-out',
          style({ transform: 'translateX(0)', opacity: 1 })
        ),
      ]),
    ]),
  ],
})
export class GestionAccesosRolesComponent {
  tabs = ['Accesos', 'Roles', 'AccesoRol'];
  selectedTab = this.tabs[0];
  previousTab = this.tabs[0];
  slideDirection = 'right';

  cambiarTab(tab: string) {
    if (tab !== this.selectedTab) {
      this.slideDirection = this.getSlideDirection(tab);
      this.previousTab = this.selectedTab;
      this.selectedTab = tab;
    }
  }

  private getSlideDirection(tab: string): string {
    const currentIndex = this.tabs.indexOf(this.selectedTab);
    const newIndex = this.tabs.indexOf(tab);
    return newIndex > currentIndex ? 'right' : 'left';
  }
}
