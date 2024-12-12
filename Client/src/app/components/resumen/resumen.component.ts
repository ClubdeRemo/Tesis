import { CommonModule, DatePipe } from '@angular/common';
import { Component } from '@angular/core';
import { FormBuilder, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { ActivatedRoute, Router, RouterModule } from '@angular/router';
import { Pagos } from '../../interfaces/Pagos';
import { PagosService } from '../../services/pagos.service';
import { jsPDF } from 'jspdf';

@Component({
  selector: 'app-resumen-pagos',
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
    MatIconModule
  ],
  providers: [DatePipe],
  templateUrl: './resumen.component.html',
  styleUrl: './resumen.component.css'
})
export class ResumenComponent {
  displayedColumns: string[] = ['Id','IdPago','FechaPago', 'Tipo', 'Monto'];
  dataSource: MatTableDataSource<Pagos>;
  data: Pagos[] = [];
  userId!: string;
  pagoSeleccionado: Pagos | null = null;

  constructor(
    private router: Router,
    private activatedRoute: ActivatedRoute,
    private pagosService: PagosService,
    private datePipe: DatePipe
  ) {
    this.dataSource = new MatTableDataSource<Pagos>(this.data);
  }
  async ngOnInit(): Promise<void> {
    try {
      // Obtener todos los pagos
      const response = await this.pagosService.obtenerTodosPagos();
      
      // Filtrar los pagos realizados hoy
      this.data = response.pagos.filter(pago => this.isPagoHoy(pago.FechaPago));
      
      // Asignar los pagos filtrados a la tabla
      this.dataSource.data = this.data;
    } catch (error) {
      console.error('Error al cargar los pagos:', error);
    }
  }
  

  // Filtra los pagos realizados hoy
  isPagoHoy(fechaPago: Date): boolean {
    const today = new Date();
    const pagoDate = new Date(fechaPago);
    return today.toDateString() === pagoDate.toDateString();
  }

  seleccionarPago(pago: Pagos): void {
    this.pagoSeleccionado = pago;
  }
  
  async volver(){
    this.router.navigate(['/menu/admin'])
  }

}
