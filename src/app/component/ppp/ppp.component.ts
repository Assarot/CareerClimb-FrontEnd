import { Component } from '@angular/core';
import { PPP } from '../../model/ppp';
import { PPPService } from '../../service/ppp.service';
import { NavbarComponent } from '../../LayoutDefault/navbar/navbar.component';
import { NgFor, NgIf } from '@angular/common';
import { ButtonModule } from 'primeng/button';
import { RouterLink } from '@angular/router';
import { DialogModule } from 'primeng/dialog';
import { FormGroup, ReactiveFormsModule } from '@angular/forms';
import { InputTextModule } from 'primeng/inputtext';
import { SolicitudComponent } from '../solicitud/solicitud.component';

@Component({
  selector: 'app-ppp',
  standalone: true,
  imports: [NavbarComponent,SolicitudComponent,NgIf,ButtonModule,RouterLink,NgFor,DialogModule,ReactiveFormsModule,InputTextModule],
  templateUrl: './ppp.component.html',
  styleUrl: './ppp.component.css'
})
export class PPPComponent {
  ppps:PPP[] = [];
  visible: boolean = false;
  isUpdate: boolean = false;
  formPPP: FormGroup = new FormGroup({});

  showDialog() {
    this.visible = true;
    this.isUpdate = false;
  }

  constructor(
    private pppService:PPPService) { 
  }

  ngOnInit():void{
    this.listarPPPs();
  }

  listarPPPs(): void {
      this.pppService.getPPP().subscribe(
      (data: PPP[]) => {
        this.ppps = data;
        console.log(data);
      },
      (error) => {
        console.error('Error al obtener los accesos', error);
      }
    );
  }
}
