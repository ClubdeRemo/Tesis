import { Component, Inject } from '@angular/core';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatDialogModule } from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatSelectModule } from '@angular/material/select';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { FormBuilder, FormGroup } from '@angular/forms'

@Component({
  selector: 'app-pago-modal',
  standalone: true,
  imports: [ CommonModule,
    MatDialogModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    MatSelectModule,],
  templateUrl: './pago-modal.component.html',
  styleUrl: './pago-modal.component.css'
})
export class PagoModalComponent {
  meses = [
    'Enero',
    'Febrero',
    'Marzo',
    'Abril',
    'Mayo',
    'Junio',
    'Julio',
    'Agosto',
    'Septiembre',
    'Octubre',
    'Noviembre',
    'Diciembre',
  ];
  metodos = ['Transferencia', 'Efectivo'];

  selectedMes: string | null = null;
  selectedMetodo: string | null = null;

  constructor(
    public dialogRef: MatDialogRef<PagoModalComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) {}

  onCancelar(): void {
    this.dialogRef.close();
  }

  onConfirmar(): void {
    this.dialogRef.close({
      mes: this.selectedMes,
      metodo: this.selectedMetodo,
    });
  }
}