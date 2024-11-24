import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormBuilder, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatDialogModule } from '@angular/material/dialog';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { ActivatedRoute, Router, RouterModule } from '@angular/router';
import { Pagos } from '../../interfaces/Pagos';
import { PagosService } from '../../services/pagos.service';
@Component({
  selector: 'app-historial-pagos',
  standalone: true,
  imports: [
    CommonModule, 
    ReactiveFormsModule, 
    FormsModule, 
    MatInputModule, 
    MatButtonModule, 
    MatCardModule,
    MatPaginatorModule,
    MatTableModule,
    RouterModule, 
    MatIconModule, 
    MatDialogModule, 
  ],
  templateUrl: './historial-pagos.component.html',
  styleUrls: ['./historial-pagos.component.css'], 
})
export class HistorialPagosComponent {
  displayedColumns: string[] = ['IdPago', 'FechaPago', 'FechaVto', 'Tipo'];
  dataSource: MatTableDataSource<Pagos>;
  data: Pagos[] = [];
  totalRecords: number = 0;

  constructor(
    private router: Router, 
    private activatedRoute: ActivatedRoute, 
    private pagosService: PagosService, 
    private fb: FormBuilder 
  ) {
    this.dataSource = new MatTableDataSource<Pagos>(this.data);
  }

  async ngOnInit(): Promise<void> {
    try {
      // Obtener el ID del usuario desde la URL
      const userId = this.activatedRoute.snapshot.paramMap.get('UserId');
      
      // Verificar que el ID sea válido (no null y es un número)
      if (userId && !isNaN(+userId)) {
        // Llamar al servicio para obtener los pagos del usuario
        const data = await this.pagosService.obtenerDatos(+userId);
        this.totalRecords = data.length; // Total de pagos
        this.data = data; // Guardar los datos de pagos
        this.dataSource.data = this.data; // Configurar la fuente de datos para la tabla
      } else {
        console.error('No se proporcionó un ID válido en la URL.');
        // Opcional: redirigir a una página de error o mostrar un mensaje
        this.router.navigate(['/error']);
      }
    } catch (error) {
      console.error('Error al cargar los datos:', error);
    }
  }
  

  getClassByEstado(EstadoSocio: string): string {
    return EstadoSocio === 'Al dia' ? 'estado-al-dia' : '';
  }
}