import { Component } from '@angular/core';
import { AbstractControl, FormControl, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { User } from '../../interfaces/User';
import { UsersService } from '../../services/users.service';
import { ActivatedRoute, RouterModule, Router } from '@angular/router';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-modificar',
  standalone: true,
  imports: [   CommonModule,
    ReactiveFormsModule,
    FormsModule,
  RouterModule],
  templateUrl: './modificar.component.html',
  styleUrl: './modificar.component.css'
})
export class ModificarComponent { 
  userform: FormGroup | any;
  showPassword: boolean = false;
  isModalVisible: boolean = false; // Control de visibilidad del modal
  isEditing: boolean = false;
  socio: User | null = null;

  constructor(
    private router: Router,
    private usersService: UsersService,
    private activatedRoute: ActivatedRoute
  ) { 
    this.userform = new FormGroup({
      Id: new FormControl({ value: '', disabled: false }), // El Id siempre habilitado
      Nombre: new FormControl({ value: '', disabled: true }, [Validators.required, Validators.minLength(3)]),
      Apellido: new FormControl({ value: '', disabled: true }, [Validators.required, Validators.minLength(3)]),
      Email: new FormControl({ value: '', disabled: true }, [Validators.required, Validators.email]),
      FechaDeNacimiento: new FormControl({ value: '', disabled: true }, [Validators.required, this.fechaNoPosterior()]),
      Dni: new FormControl({ value: '', disabled: true }, [Validators.required, Validators.pattern('^[0-9]{8}$')])
    });
}
ngOnInit(): void {

}
buscarSocioPorId(): void {
  const id = this.userform.get('Id')?.value;

  if (id) {
    this.usersService.obtenerSocioPorId(id).subscribe((socio) => {
      if (socio) {
        // Convertir la fecha al formato 'yyyy-MM-dd'
        const fechaNacimiento = new Date(socio.FechaDeNacimiento);
        const fechaFormatoCorrecto = `${fechaNacimiento.getFullYear()}-${(fechaNacimiento.getMonth() + 1).toString().padStart(2, '0')}-${fechaNacimiento.getDate().toString().padStart(2, '0')}`;
        
        this.userform.patchValue({
          Nombre: socio.Nombre,
          Apellido: socio.Apellido,
          Email: socio.Email,
          FechaDeNacimiento: fechaFormatoCorrecto, // Asignar la fecha en el formato correcto
          Dni: socio.Dni
        });
        this.userform.get('Nombre')?.enable();
        this.userform.get('Apellido')?.enable();
        this.userform.get('Email')?.enable();
        this.userform.get('FechaDeNacimiento')?.enable();
        this.userform.get('Dni')?.enable();
    
        // Establecer isEditing en true
        this.isEditing = true; // Esto habilitará el botón de editar

      } else {
        console.error('Socio no encontrado');
      }
    });
  }
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
  
      const id = this.userform.get('Id')?.value; // Obtiene el ID del usuario
  
      if (id) {
        // Llama a la función para actualizar el usuario
        this.usersService.actualizarUsuario(id, this.userform.value)
          .then(() => {
            this.showModal(); // Mostrar modal cuando la respuesta es exitosa
            this.userform.reset();
          })
          .catch((err: any) => {
            console.error('Error al actualizar los datos:', err);
          });
      }
    } else {
      console.log('Formulario inválido');
      this.userform.markAllAsTouched();
    }
  }
  
}