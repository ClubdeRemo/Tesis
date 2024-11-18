import { Component, Inject } from '@angular/core';
import { MatDialog, MAT_DIALOG_DATA, MatDialogModule } from '@angular/material/dialog';
import { CommonModule } from '@angular/common';
import { MatListModule } from '@angular/material/list';
import { NavbarComponent } from '../navbar/navbar.component';

@Component({
  selector: 'app-manual',
  standalone: true,
  templateUrl: './manual.component.html',
  styleUrls: ['./manual.component.css'],
  imports: [CommonModule, MatDialogModule, MatListModule, NavbarComponent],
})
export class ManualComponent {
  constructor(private dialog: MatDialog) {}

  // Arreglo con los datos para cada título
  items = [
    {
      title: 'Manual de Usuario',
      content: 'Este manual de usuario describe todas las funcionalidades de la página web y cómo utilizarlas correctamente. Haz clic en el título de la sección que deseas explorar para obtener más información.',
    },
    {
      title: 'Inicio de Sesión',
      content: 'Aquí se describe la información correspondiente a Título 2.',
    },
    {
      title: 'Reportes',
      content: 'Detalles específicos para Título 3 se encuentran aquí.',
    },
    {
      title: 'Historia',
      content: 'Detalles específicos para Título 3 se encuentran aquí.',
    },
  ];

  // Método para abrir el modal y pasar los datos del ítem seleccionado
  openDialog(item: { title: string; content: string }) {
    this.dialog.open(DialogContentInline, {
      width: '500px',
      data: item, // Enviamos el objeto completo (título y contenido) al modal
    });
  }
}

// Componente inline para el contenido del modal
@Component({
  selector: 'dialog-content-inline',
  standalone: true,
  template: `
    <h1>{{ data.title }}</h1>
    <p>{{ data.content }}</p>
  `,
  imports: [CommonModule],
})
export class DialogContentInline {
  constructor(
    @Inject(MAT_DIALOG_DATA) public data: { title: string; content: string } // Recibimos el objeto enviado
  ) {}
}