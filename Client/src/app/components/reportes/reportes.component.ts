import { Component, OnInit, ViewChild } from '@angular/core';
import { FooterComponent } from "../footer/footer.component";
import { NavbarComponent } from "../navbar/navbar.component";
import { CommonModule } from '@angular/common';
import { AbstractControl, FormBuilder, FormControl, FormGroup, ReactiveFormsModule, ValidatorFn, Validators } from '@angular/forms';
import { ReportesService } from '../../services/reportes.service';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { MatCardModule } from '@angular/material/card';
import { HttpClientModule, HttpClient } from '@angular/common/http';
import { WeatherComponent } from "../weather/weather.component";
import { MatIconModule } from '@angular/material/icon';
import { Router } from '@angular/router';
import { MatDialog } from '@angular/material/dialog';
import { ModificarMensajeComponent } from '../modificar-mensaje/modificar-mensaje.component';
import { MatDialogModule } from '@angular/material/dialog';
import { MatButtonModule } from '@angular/material/button';


@Component({
  selector: 'app-reportes',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    MatCardModule,
    MatTableModule,
    HttpClientModule,
    WeatherComponent,
    MatIconModule,
    MatDialogModule,
    MatButtonModule
  ],
  templateUrl: './reportes.component.html',
  styleUrls: ['./reportes.component.css']
})

export class ReportesComponent implements OnInit {
  msj: FormGroup;
  dataSource: MatTableDataSource<any>;
  displayedColumns: string[] = ['Mensaje', 'Fecha', 'Acciones'];

  mensajeSeleccionado: any = null;

  constructor(
    private fb: FormBuilder, 
    private reportesService: ReportesService,
    private dialog: MatDialog
  ) {
    this.dataSource = new MatTableDataSource<any>([]);
    this.msj = this.fb.group({
      Mensaje: ['', [Validators.maxLength(1000), Validators.required, maxWordLengthValidator(25)]],
      Fecha: ['']
    });
  }

  ngOnInit(): void {
    this.cargarMensajes();
  }

  async enviarMsj() {
    if (this.msj.valid) {
      try {
        if (this.mensajeSeleccionado) {
          // Si estamos editando, actualizamos el mensaje
          await this.reportesService.modificarMensaje(this.mensajeSeleccionado.IdMensaje, this.msj.value);
        } else {
          // Si es un nuevo mensaje, lo enviamos
          await this.reportesService.enviarDatos(this.msj.value);
        }
        this.msj.reset();
        this.mensajeSeleccionado = null;
        this.cargarMensajes(); // Recargamos los mensajes después de la operación
      } catch (error) {
        console.error('Error al enviar o modificar el mensaje:', error);
      }
    } else {
      console.log('Mensaje inválido');
      this.msj.markAllAsTouched();
    }
  }

  editarMensaje(IdMensaje: number, Mensaje: string): void {
    const dialogRef = this.dialog.open(ModificarMensajeComponent, {
      data: { id: IdMensaje, mensaje: Mensaje }, 
      width: '500px',
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.cargarMensajes(); // Recargar la lista si se modificó algo
      }
    });
  }

  // Función para cargar los mensajes
  async cargarMensajes() {
    try {
      const data = await this.reportesService.obtenerDatos();
      this.dataSource = new MatTableDataSource(data);  // Recargar los datos de la tabla
    } catch (error) {
      console.error('Error al cargar los mensajes:', error);
    }
  }

  async eliminarMensaje(IdMensaje: string) {
    const confirmacion = confirm("¿Estás seguro de que deseas eliminar este mensaje?");
    if (confirmacion) {
      try {
        await this.reportesService.eliminarMensaje(IdMensaje);
        alert("Mensaje eliminado correctamente.");
        this.cargarMensajes(); // Recargar los mensajes después de eliminar
      } catch (error) {
        console.error("Error al eliminar mensaje:", error);
        alert("Hubo un error al intentar eliminar el mensaje.");
      }
    }
  }
}

export function maxWordLengthValidator(maxLength: number) {
  return (control: AbstractControl) => {
    const value = control.value ? control.value.toString() : '';
    const words: string[] = value.split(/\s+/);
    const hasLongWord = words.some((word: string) => word.length > maxLength);
    return hasLongWord ? { 'maxWordLength': { value: control.value } } : null;
  };
}