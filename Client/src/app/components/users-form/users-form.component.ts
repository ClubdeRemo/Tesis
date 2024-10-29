import { Component, OnInit } from '@angular/core';
import { ReactiveFormsModule, FormBuilder, FormGroup, FormControl, FormsModule, Validators, AbstractControl } from '@angular/forms';
import { UsersService } from '../../services/users.service';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, Router } from '@angular/router';
import { User } from '../../interfaces/User';

@Component({
  selector: 'app-users-form',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    FormsModule
  ],
  templateUrl: './users-form.component.html',
  styleUrls: ['./users-form.component.css'],
  providers: [UsersService]
})
export class UsersFormComponent implements OnInit {
  userform: FormGroup | any;
  showPassword: boolean = false;
  isModalVisible: boolean = false; // Control de visibilidad del modal
  socio: User | null = null;

  constructor(
    private router: Router,
    private usersService: UsersService,
    private activatedRoute: ActivatedRoute
  ) { 
    this.userform = new FormGroup({
      Nombre: new FormControl('', [Validators.required, Validators.minLength(3)]),
      Apellido: new FormControl('', [Validators.required, Validators.minLength(3)]),
      Email: new FormControl('', [Validators.required, Validators.email]),
      Contraseña: new FormControl('', [Validators.required, Validators.minLength(6)]),
      FechaDeNacimiento: new FormControl('', [Validators.required, this.fechaNoPosterior()]),
      Dni: new FormControl('', [Validators.required, Validators.pattern('^[0-9]{8}$')])
    });
}
ngOnInit(): void {
  
}

  fechaNoPosterior() {
    return (control: AbstractControl) => {
      const fechaIngresada = new Date(control.value);
      const fechaActual = new Date();
      if (fechaIngresada > fechaActual) {
        return { fechaPosterior: true };
      }
      return null; // Si no hay error
    };
  }

  togglePasswordVisibility(): void {
    this.showPassword = !this.showPassword;
  }

  // Función para mostrar la modal
  showModal(): void {
    this.isModalVisible = true;

    // Cerrar automáticamente después de 3 segundos
    setTimeout(() => {
      this.closeModal();
    }, 3000);
  }

  // Función para cerrar la modal
  closeModal(): void {
    this.isModalVisible = false;
  }

  onSubmit(): void {
    if (this.userform.valid) {
      console.log('Formulario válido:', this.userform.value);
      
      // Manejo de Promesa en lugar de Observable
      this.usersService.enviarDatos(this.userform.value)
        .then(() => {
          this.showModal(); // Mostrar modal cuando la respuesta es exitosa
          this.userform.reset();
        })
        .catch((err: any) => {
          console.error('Error al enviar los datos:', err);
        });
      
    } else {
      console.log('Formulario inválido');
      this.userform.markAllAsTouched();
    }
  }
}