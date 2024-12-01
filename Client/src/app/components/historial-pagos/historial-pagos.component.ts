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
  ) {
    this.dataSource = new MatTableDataSource<Pagos>(this.data);
  }

  async ngOnInit(): Promise<void> {
    try {                                                                 
      const userId = this.activatedRoute.snapshot.paramMap.get('UserId');
      if (userId && !isNaN(+userId)) {
        const response = await this.pagosService.obtenerDatos(+userId); // Obtener datos del servicio
        this.data = response.pagos; // Acceder solo a la lista de pagos
        this.dataSource.data = this.data; // Asignar los pagos al dataSource
      } else {
        console.error('El UserId no es válido.'); // Si el UserId no es válido                                                        
        this.router.navigate(['/error']);
      }
    } catch (error) {
      console.error('Error al cargar los pagos:', error);
    }
  }
}