import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms'; // Importar FormsModule para el manejo de formularios
import { CommonModule } from '@angular/common'; // Importar CommonModule para usar *ngIf

@Component({
  selector: 'app-registrar-pago',
  standalone: true,
  imports: [FormsModule, CommonModule], // Importar FormsModule y CommonModule aquí
  templateUrl: './registrar-pago.component.html',
  styleUrls: ['./registrar-pago.component.css'] // Aquí debería ser "styleUrls" en plural
})
export class RegistrarPagoComponent {
  dni: string = '';
  user: { dni: string; name: string; lastname: string } | null = null;
  paymentFrequency: string = 'mensual';
  paymentMethod: string = 'efectivo';
  currentDate: string = '';


  
  constructor() {
    const today = new Date();
    this.currentDate = today.toLocaleDateString();
  }

  searchUser(): void {
    // Lógica simulada para buscar un usuario
    if (this.dni === '12345678') {
      this.user = {
        dni: '12345678',
        name: 'Juan',
        lastname: 'Pérez'
      };
    } else {
      this.user = null;
      alert('Usuario no encontrado.');
    }
  }

  submitPayment(): void {
    if (!this.user) {
      alert('Por favor, busca un usuario antes de enviar el pago.');
      return;
    }

    // Lógica de envío del pago
    const paymentData = {
      dni: this.dni,
      paymentFrequency: this.paymentFrequency,
      paymentMethod: this.paymentMethod,
      date: this.currentDate
    };

    console.log('Datos del pago:', paymentData);
    alert('Pago enviado correctamente.');
  }
}
