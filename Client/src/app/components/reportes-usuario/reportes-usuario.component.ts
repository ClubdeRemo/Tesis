import { Component, OnInit } from '@angular/core';
import { NavbarComponent } from "../navbar/navbar.component";
import { CommonModule } from '@angular/common';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { MatCardModule } from '@angular/material/card';
import { HttpClientModule } from '@angular/common/http';
import { WeatherComponent } from "../weather/weather.component";
import { ReportesService } from '../../services/reportes.service'; // Asegúrate de importar correctamente

@Component({
  selector: 'app-reportes-usuario',
  standalone: true,
  imports: [
    NavbarComponent,
    CommonModule,
    MatCardModule,
    MatTableModule,
    HttpClientModule,
    WeatherComponent
  ],
  templateUrl: './reportes-usuario.component.html',
  styleUrl: './reportes-usuario.component.css'
})
export class ReportesUsuarioComponent implements OnInit {
  dataSource: MatTableDataSource<any>;
  displayedColumns: string[] = ['Mensaje', 'Fecha'];

  constructor(private reportesService: ReportesService) {
    this.dataSource = new MatTableDataSource<any>([]);
  }

  async ngOnInit(): Promise<void> {
    try {
      // Llama al servicio para obtener los datos
      const data: any[] = await this.reportesService.obtenerDatos();
      this.dataSource = new MatTableDataSource<any>(data);
    } catch (error) {
      console.error('Error al cargar los datos:', error);
    }
  }
}