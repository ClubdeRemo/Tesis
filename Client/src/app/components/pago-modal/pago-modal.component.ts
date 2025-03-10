import { Component, Inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatDialogModule } from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatSelectModule } from '@angular/material/select';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatNativeDateModule } from '@angular/material/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
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
    MatDatepickerModule,
    MatNativeDateModule,
    FormsModule,
    ReactiveFormsModule
  ],
  templateUrl: './pago-modal.component.html',
  styleUrls: ['./pago-modal.component.css']
})
export class PagoModalComponent {
  pagoForm: FormGroup;
  metodos = ['Transferencia', 'Efectivo'];

  constructor(
    @Inject(MAT_DIALOG_DATA) public data: { UserId: number },
    public dialogRef: MatDialogRef<PagoModalComponent>,
    private fb: FormBuilder
  ) {
    this.pagoForm = this.fb.group({
      monto: ['', [Validators.required, Validators.pattern(/^\d+(\.\d{1,2})?$/)]],
      metodo: [null, Validators.required],
      fechaPago: [null, Validators.required]
    });
  }

  onCancelar(): void {
    this.dialogRef.close();
  }

  onConfirmar(): void {
    if (this.pagoForm.valid) {
      const { monto, metodo, fechaPago } = this.pagoForm.value;

      const nuevoPago: Pagos = {
        UserId: this.data.UserId,
        FechaPago: fechaPago || new Date(),
        FechaVto: this.calculateFechaVto(fechaPago || new Date()),
        Tipo: metodo || 'Efectivo',
        Monto: parseFloat(monto)
      };

      this.dialogRef.close(nuevoPago);
    } else {
      console.error('Formulario inválido:', this.pagoForm.errors);
    }
  }

  private calculateFechaVto(fechaPago: Date): Date {
    const fechaVto = new Date(fechaPago);
    fechaVto.setMonth(fechaPago.getMonth() + 1);
    if (fechaVto.getMonth() !== (fechaPago.getMonth() + 1) % 12) {
      fechaVto.setDate(0);
    }
    return fechaVto;
  }
}
