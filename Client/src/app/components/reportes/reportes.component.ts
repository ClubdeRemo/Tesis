import { Component } from '@angular/core';
import { FooterComponent } from "../footer/footer.component";
import { NavbarComponent } from "../navbar/navbar.component";
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-reportes',
  standalone: true,
  imports: [FooterComponent, NavbarComponent, CommonModule],
  templateUrl: './reportes.component.html',
  styleUrl: './reportes.component.css'
})
export class ReportesComponent {
  mensajes = [
    { titulo: 'Actualización de políticas', contenido: 'Se ha actualizado la política de privacidad del club.', autor: 'Admin 1' },
    { titulo: 'Reunión general', contenido: 'La próxima reunión será el 15 de octubre en la sala principal.', autor: 'Admin 2' },
    { titulo: 'Nuevo reglamento', contenido: 'Se ha aprobado el nuevo reglamento interno.', autor: 'Admin 3' }
  ];

  constructor() { }

  ngOnInit(): void { }
}
