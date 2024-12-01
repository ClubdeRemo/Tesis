import { Component, Inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatDialogModule } from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatSelectModule } from '@angular/material/select';
import { MatDatepickerModule } from '@angular/material/datepicker';  
import { MatNativeDateModule } from '@angular/material/core';  // Asegúrate de que esta línea esté presente
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { FormsModule } from '@angular/forms';
import { Pagos } from '../../interfaces/Pagos';

@Component({
  selector: 'app-pago-modal',
  standalone: true,
  imports: [
    CommonModule,
    MatDialogModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    MatSelectModule,
    MatDatepickerModule,  // Asegúrate de importar este módulo
    MatNativeDateModule,  // Asegúrate de importar este módulo
    FormsModule,  
  ],
  templateUrl: './pago-modal.component.html',
  styleUrl: './pago-modal.component.css'
})
export class PagoModalComponent {

  metodos = ['Transferencia', 'Efectivo'];

  selectedMes: string | null = null;
  selectedMetodo: string | null = null;
  selectedFecha: Date | null = null;
//  UserId: number | null = null;

  constructor(@Inject(MAT_DIALOG_DATA) public data: { UserId: number }, public dialogRef: MatDialogRef<PagoModalComponent>) {
//    this.UserId = data.UserId;
    console.log('UserId recibido en el modal:', data.UserId);
  }

  onCancelar(): void {
    this.dialogRef.close();
  }
  onConfirmar(): void {
    if (!this.data.UserId) {
      console.error('UserId es obligatorio.');
      return;
    }
  
    const nuevoPago: Pagos = {
      UserId: this.data.UserId,
      FechaPago: this.selectedFecha || new Date(),
      FechaVto: this.calculateFechaVto(),
      Tipo: this.selectedMetodo || 'Efectivo',
    };
  
    this.dialogRef.close(nuevoPago); // Devuelve el pago al cerrar el modal
  }
  private calculateFechaVto(): Date {
    const hoy = new Date();
    // Crear una nueva fecha que sea el mismo día, pero el mes siguiente
    const fechaVto = new Date(hoy);
    fechaVto.setMonth(hoy.getMonth() + 1);  // Establecer el mes siguiente
  
    // Si el mes siguiente no tiene el mismo día, ajustamos al último día del mes
    if (fechaVto.getMonth() !== (hoy.getMonth() + 1) % 12) {
      fechaVto.setDate(0); // Establece el último día del mes anterior (mes siguiente)
    }
  
    return fechaVto;
  }
  

// Aqui deberia realizar una relacion bidireccional con [(ngModel)]="selectedFecha": Realiza el enlace bidireccional entre el modelo de datos
// Tambien [matDatepicker]="picker": Vincula este campo de entrada con un componente de calendario identificado como picker.
}
/* 
Obtenemos la fecha de hoy con new Date().
Calculamos el mes siguiente con fechaVto.setMonth(hoy.getMonth() + 1). Este método establece el mes a uno más que el mes actual.
Ajuste para meses con diferente número de días: Si el día de la fecha siguiente no existe en el nuevo mes 
(como cuando se pasa de enero 31 a febrero), la propiedad getMonth() de la fecha resultante no coincidiría con el mes esperado.
 En ese caso, usamos setDate(0) para establecer la fecha al último día del mes anterior (el mes siguiente en este caso). */