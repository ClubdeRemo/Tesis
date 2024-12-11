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
  selector: 'app-historial-usuario',
  standalone: true,
  imports: [CommonModule,
    ReactiveFormsModule,
    FormsModule,
    MatInputModule,
    MatButtonModule,
    MatCardModule,
    MatPaginatorModule,
    MatTableModule,
    RouterModule,
    MatIconModule,
    MatDialogModule,],
  templateUrl: './historial-usuario.component.html',
  styleUrl: './historial-usuario.component.css'
})
export class HistorialUsuarioComponent {
  displayedColumns: string[] = ['IdPago', 'FechaPago', 'MesPago', 'Tipo'];
  dataSource: MatTableDataSource<Pagos>;
  data: Pagos[] = [];
  totalRecords: number = 0;
  userId!: string;
  currentMonth: string;
  comprobanteVisible: boolean = false; // Flag para mostrar el comprobante
  comprobante: Pagos | null = null;  // Detalles del pago seleccionado
  pagoSeleccionado: Pagos | null = null; // Nueva propiedad para el pago seleccionado

  constructor(
    private router: Router,
    private activatedRoute: ActivatedRoute,
    private pagosService: PagosService
  ) {
    this.dataSource = new MatTableDataSource<Pagos>(this.data);

    const months = [
      'Enero', 'Febrero', 'Marzo', 'Abril', 'Mayo', 'Junio', 
      'Julio', 'Agosto', 'Septiembre', 'Octubre', 'Noviembre', 'Diciembre'
    ];
    const today = new Date();
    this.currentMonth = months[today.getMonth()];

    this.activatedRoute.paramMap.subscribe((params) => {
      this.userId = params.get('UserId')!;
    });
  }

  async ngOnInit(): Promise<void> {
    try {
      const userId = this.activatedRoute.snapshot.paramMap.get('UserId');
      if (userId && !isNaN(+userId)) {
        const response = await this.pagosService.obtenerDatos(+userId);
        // Agregar mesPago a los pagos
        this.data = response.pagos.map((pago) => ({
          ...pago,
          mesPago: this.getMonthName(new Date(pago.FechaPago).getMonth()),
        }));
        this.dataSource.data = this.data;
      } else {
        this.router.navigate(['/error']);
      }
    } catch (error) {
      console.error('Error al cargar los pagos:', error);
    }
  }

  private getMonthName(monthIndex: number): string {
    const months = ['Enero', 'Febrero', 'Marzo', 'Abril', 'Mayo', 'Junio', 'Julio', 'Agosto', 'Septiembre', 'Octubre', 'Noviembre', 'Diciembre'];
    return months[monthIndex];
  }

  // Función para seleccionar un pago y mostrar el comprobante
  seleccionarPago(pago: Pagos): void {
    this.pagoSeleccionado = pago; // Guardamos el pago seleccionado
    this.comprobante = pago;
    this.comprobanteVisible = true;
  }

}
