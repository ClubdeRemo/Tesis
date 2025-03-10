import { Component } from '@angular/core';
import { FormBuilder, FormGroup, FormsModule, Validators, ReactiveFormsModule} from '@angular/forms'; // Importar FormsModule para el manejo de formularios
import { CommonModule } from '@angular/common'; // Importar CommonModule para usar *ngIf
import { UsersService } from '../../services/users.service';

@Component({
  selector: 'app-registrar-pago',
  standalone: true,
  imports: [FormsModule, CommonModule, ReactiveFormsModule], // Importar FormsModule y CommonModule aquí
  templateUrl: './registrar-pago.component.html',
  styleUrls: ['./registrar-pago.component.css'] // Aquí debería ser "styleUrls" en plural
})
export class RegistrarPagoComponent {
  dniForm: FormGroup;
  usuarioEncontrado: { nombre: string; apellido: string } | null = null;
  paymentFrequency: string = 'mensual';
  paymentMethod: string = 'efectivo';
  currentDate: string = '';

  constructor(private fb: FormBuilder, private usersService: UsersService) {
    this.dniForm = this.fb.group({
      dni: ['', [Validators.required]]
    });
    const today = new Date();
    this.currentDate = today.toLocaleDateString();
  } 
  
  async buscarUsuario(): Promise<void> {
    if (this.dniForm.valid) {
      const dni = this.dniForm.get('dni')?.value;
      try {
        // Llama al servicio para buscar el usuario por DNI
        const user = await this.usersService.obtenerPorDni(dni);
        if (user) {
          this.usuarioEncontrado = { nombre: user.Nombre, apellido: user.Apellido }; // Asigna los valores obtenidos
        } else {
          console.log('Usuario no encontrado con DNI:', dni);
          this.usuarioEncontrado = null; // Si no se encuentra, restablece el usuario encontrado
        }
      } catch (error) {
        console.error('Error al buscar el usuario:', error);
      }
    }
  }
}