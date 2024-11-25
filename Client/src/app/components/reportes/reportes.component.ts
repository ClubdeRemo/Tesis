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

@Component({
  selector: 'app-reportes',
  standalone: true,
  imports: [
    NavbarComponent,
    CommonModule,
    ReactiveFormsModule,
    MatCardModule,
    MatTableModule,
    HttpClientModule,
    WeatherComponent],
  templateUrl: './reportes.component.html',
  styleUrl: './reportes.component.css'
})

export class ReportesComponent implements OnInit {
  msj: FormGroup;
  dataSource: MatTableDataSource<any>;
  displayedColumns: string[] = ['Mensaje', 'Fecha']; // Añade la columna Fecha


  constructor(
    private fb: FormBuilder, 
    private reportesService: ReportesService
  ) {
    this.dataSource = new MatTableDataSource<any>([]);
    this.msj = this.fb.group({
      Mensaje: ['', [Validators.maxLength(1000), Validators.required, maxWordLengthValidator(25)]],
      Fecha: ['']
    });
  }

  async ngOnInit(): Promise<void> {
    try {
      // Llama al servicio para obtener los datos desde la base de datos
      const data: [] = await this.reportesService.obtenerDatos();
      this.dataSource = new MatTableDataSource<any>(data);  // Pasa los datos a la tabla
    } catch (error) {
      console.error('Error al cargar los datos:', error);
    }
  }

  async enviarMsj() {
    if (this.msj.valid) {
      console.log('Mensaje válido:', this.msj.value);
      
      try {
        // Espera a que se envíe el mensaje antes de cargar los nuevos datos
        await this.reportesService.enviarDatos(this.msj.value);
        this.msj.reset();  // Resetear el formulario después de enviar el mensaje
        await this.cargarMensajes();  // Recargar los mensajes
      } catch (error) {
        console.error('Error al enviar el mensaje:', error);
      }
    } else {
      console.log('Mensaje inválido');
      this.msj.markAllAsTouched();
    }
  }

  async cargarMensajes() {
    try {
      const data = await this.reportesService.obtenerDatos();
      this.dataSource = new MatTableDataSource(data);  // Recargar los datos de la tabla
    } catch (error) {
      console.error('Error al cargar los mensajes:', error);
    }
  }
  
}

export function maxWordLengthValidator(maxLength: number): ValidatorFn {
  return (control: AbstractControl): { [key: string]: any } | null => {
    // Verifica si control.value es null o undefined y lo convierte a string vacío si lo es
    const value = control.value ? control.value.toString() : '';

    const words: string[] = value.split(/\s+/); // Aseguramos que words es un arreglo de strings

    // Verifica si hay alguna palabra con más de 'maxLength' caracteres
    const hasLongWord = words.some((word: string) => word.length > maxLength);

    // Retorna un error si se encuentra una palabra muy larga
    return hasLongWord ? { 'maxWordLength': { value: control.value } } : null;
  };


  
}