import { Component, OnInit } from '@angular/core';
import { FooterComponent } from "../footer/footer.component";
import { NavbarComponent } from "../navbar/navbar.component";
import { CommonModule } from '@angular/common';
import { FormBuilder, FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { ReportesService } from '../../services/reportes.service';

@Component({
  selector: 'app-reportes',
  standalone: true,
  imports: [FooterComponent, NavbarComponent, CommonModule, ReactiveFormsModule],
  templateUrl: './reportes.component.html',
  styleUrl: './reportes.component.css'
})
export class ReportesComponent implements OnInit {
  msj: FormGroup;
  constructor(private fb: FormBuilder, private reportesService: ReportesService) {
    this.msj = this.fb.group({
      miInput: ['', Validators.required]
    });
  }

  ngOnInit(): void {
  }

  enviarMsj() {
    if (this.msj.valid) {console.log('Mensaje válido:', this.msj.value);
      this.reportesService.enviarDatos(this.msj.value);
      this.msj.reset();
    } else {
      console.log('Mensaje inválido');
      this.msj.markAllAsTouched();
    }
  }

  mensajes = [
    { titulo: 'Actualización de políticas', contenido: 'Se ha actualizado la política de privacidad del club.', autor: 'Admin 1' },
    { titulo: 'Reunión general', contenido: 'La próxima reunión será el 15 de octubre en la sala principal.', autor: 'Admin 2' },
    { titulo: 'Nuevo reglamento', contenido: 'Se ha aprobado el nuevo reglamento interno.', autor: 'Admin 3' }
  ];
}
