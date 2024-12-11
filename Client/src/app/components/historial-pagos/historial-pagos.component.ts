import { CommonModule, DatePipe } from '@angular/common';
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
import { jsPDF } from 'jspdf';

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
  providers: [DatePipe],
  templateUrl: './historial-pagos.component.html',
  styleUrls: ['./historial-pagos.component.css'],
})
export class HistorialPagosComponent {
  displayedColumns: string[] = ['FechaPago', 'Tipo', 'Monto'];
  dataSource: MatTableDataSource<Pagos>;
  data: Pagos[] = [];
  totalRecords: number = 0;
  userId!: string;
  comprobanteVisible: boolean = false; // Flag para mostrar el comprobante
  comprobante: Pagos | null = null; // Detalles del pago seleccionado
  pagoSeleccionado: Pagos | null = null; // Pago seleccionado actualmente
  email: string = '';

  constructor(
    private router: Router,
    private activatedRoute: ActivatedRoute,
    private pagosService: PagosService,
    private datePipe: DatePipe
  ) {
    this.dataSource = new MatTableDataSource<Pagos>(this.data);

    this.activatedRoute.paramMap.subscribe((params) => {
      this.userId = params.get('UserId')!;
    });
  }

  async ngOnInit(): Promise<void> {
    try {
      const userId = this.activatedRoute.snapshot.paramMap.get('UserId');
      if (userId && !isNaN(+userId)) {
        const response = await this.pagosService.obtenerDatos(+userId);
        this.data = response.pagos;
        this.dataSource.data = this.data;
      } else {
        this.router.navigate(['/error']);
      }
    } catch (error) {
      console.error('Error al cargar los pagos:', error);
    }
  }

  // Función para seleccionar un pago y mostrar el comprobante
  seleccionarPago(pago: Pagos): void {
    this.pagoSeleccionado = pago; // Guardamos el pago seleccionado
    this.comprobante = pago;
    this.comprobanteVisible = true;
  }


  generarComprobante(): void {
    if (this.comprobante) {
      const doc = new jsPDF();
  
      // Añadir el logo del club
      const logoUrl = '/ACR.png'; // Reemplaza con la URL del logo o una cadena base64 de la imagen
      doc.addImage(logoUrl, 'JPEG', 14, 10, 30, 20); // Ajusta el tamaño y la posición según sea necesario
  
      // Título del comprobante
      doc.setFontSize(18);
      doc.setFont("times", "bold");
      doc.text('Comprobante de Pago', 75, 20);
  
      // Separador
      doc.setLineWidth(0.5);
      doc.line(14, 30, 195, 30);
  
      // Formatear y verificar las fechas
      const fechaPago = this.datePipe.transform(this.comprobante.FechaPago, 'yyyy-MM-dd HH:mm') || 'Fecha no disponible';
      const fechaVto = this.datePipe.transform(this.comprobante.FechaVto, 'yyyy-MM-dd HH:mm') || 'Fecha no disponible';
  
      // Detalles del pago
      doc.setFontSize(12);
      doc.setFont("times", "normal");
  
      // Agregar información del pago
      doc.text(`Socio n°: ${this.comprobante.UserId}`, 14, 40);
      doc.text(`Fecha de Pago: ${fechaPago}`, 14, 50);
      doc.text(`Tipo de Pago: ${this.comprobante.Tipo}`, 14, 60);
      doc.text(`Monto: $${this.comprobante.Monto}`, 14, 70);
      doc.text(`Fecha de Vencimiento: ${fechaVto}`, 14, 80);
  
      // Separador final
      doc.setLineWidth(0.5);
      doc.line(14, 90, 195, 90);
  
      // Nota adicional (si es necesario)
      doc.setFontSize(10);
      doc.text('Este comprobante es válido solo para el pago correspondiente.', 14, 100);
  
      // Abrir el PDF en una nueva pestaña
      const pdfUrl = doc.output('bloburl');
      window.open(pdfUrl, '_blank');
    } else {
      alert('No se ha seleccionado un pago.');
    }
  }
  
  enviarEmail(): void {
    if (!this.email) {
      alert('Por favor, ingresa un correo electrónico.');
      return;
    }
  
    const subject = 'Comprobante de Pago';  // Asunto del correo
    const body = 'Adjunto el comprobante de pago.';  // Cuerpo del correo
  
   // Crear la URL mailto: para abrir el cliente de correo
    const mailtoUrl = `mailto:${this.email}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
  
    // Abrir el cliente de correo
    window.location.href = mailtoUrl;
  }
}
