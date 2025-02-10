import { Component } from '@angular/core';
import { AbstractControl, FormControl, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { User } from '../../interfaces/User';
import { UsersService } from '../../services/users.service';
import { ActivatedRoute, RouterModule, Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { MatFormField } from '@angular/material/form-field';
import { MatSelect, MatSelectModule } from '@angular/material/select';
import { MatOptionModule } from '@angular/material/core';

@Component({
  selector: 'app-modificar',
  standalone: true,
  imports: [  CommonModule,
    ReactiveFormsModule,
    FormsModule,
    RouterModule,
    MatFormField,
    MatSelectModule,
    MatOptionModule,

],
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
      Contraseña: new FormControl({ value: '', disabled: true }, [ Validators.minLength(3)]),
      Email: new FormControl({ value: '', disabled: true }, [Validators.required, Validators.email]),
      FechaDeNacimiento: new FormControl({ value: '', disabled: true }, [Validators.required, this.fechaNoPosterior()]),
      Dni: new FormControl({ value: '', disabled: true }, [Validators.required, Validators.pattern('^[0-9]{8}$')]),
      Categorias: new FormControl({ value: '', disabled: true }, [Validators.required]),
    });
}
ngOnInit(): void {
  // Captura el ID de la ruta al cargar el componente
  const id = this.activatedRoute.snapshot.paramMap.get('id');

  if (id) {
    // Establece el valor del control de ID y llama al método para buscar el socio
    this.userform.get('Id')?.setValue(id);
    this.buscarSocioPorId();
  }
}

guardarCambios(): void {
  const formularioValores: User = this.userform.value;
  const id = this.userform.get('Id')?.value; // Obtenemos el ID del formulario

  // Construimos el objeto con los datos que vamos a enviar
  const socioActualizado: User = {
    Nombre: formularioValores.Nombre,
    Apellido: formularioValores.Apellido,
    Email: formularioValores.Email,
    FechaDeNacimiento: formularioValores.FechaDeNacimiento,
    Dni: formularioValores.Dni,
    Categorias: formularioValores.Categorias,
    
  };

  // Solo se agrega la contraseña si el usuario la proporciona
  if (formularioValores.Contraseña?.trim()) {
    socioActualizado.Contraseña = formularioValores.Contraseña;
  } else {
    // Si la contraseña no se proporciona, la dejamos sin cambios
    delete socioActualizado.Contraseña;
  }

  // Llamamos al servicio para actualizar el usuario
  this.usersService.actualizarUsuario(id, socioActualizado).subscribe(() => {
    console.log('Socio actualizado exitosamente');
  }, (error) => {
    console.error('Error al actualizar el socio', error);
  });
}


buscarSocioPorId(): void {
  const id = this.userform.get('Id')?.value;

  if (id) {
    this.usersService.obtenerSocioPorId(id).subscribe((socio) => {
      if (socio) {
        // Convertir la fecha al formato 'yyyy-MM-dd'
        const fechaNacimiento = new Date(socio.FechaDeNacimiento);
        const fechaFormatoCorrecto = `${fechaNacimiento.getFullYear()}-${(fechaNacimiento.getMonth() + 1).toString().padStart(2, '0')}-${fechaNacimiento.getDate().toString().padStart(2, '0')}`;

        // Actualizar los valores del formulario, dejando la contraseña vacía
        this.userform.patchValue({
          Nombre: socio.Nombre,
          Apellido: socio.Apellido,
          Email: socio.Email,
          Contraseña: '', // Dejar la contraseña vacía al cargar los datos
          FechaDeNacimiento: fechaFormatoCorrecto,
          Dni: socio.Dni
        });

        // Habilitar los campos del formulario
        this.userform.get('Nombre')?.enable();
        this.userform.get('Apellido')?.enable();
        this.userform.get('Email')?.enable();
        this.userform.get('Contraseña')?.enable();
        this.userform.get('FechaDeNacimiento')?.enable();
        this.userform.get('Dni')?.enable();
        this.userform.get('Categorias')?.enable();

        // Establecer isEditing en true para habilitar el botón de editar
        this.isEditing = true;

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
      console.log('Enviando datos de edición:', this.userform.getRawValue());
  
      // Obtenemos el valor del ID y los datos actualizados del formulario
      const id = this.userform.get('Id')?.value;
      const datosActualizados = this.userform.getRawValue(); // Usa getRawValue para incluir campos deshabilitados
  
      if (id) {
        this.usersService.actualizarUsuario(id, datosActualizados)
          .subscribe(
            (response) => {
              console.log('Usuario actualizado con éxito:', response);
              this.showModal(); // Muestra el modal de confirmación
              this.userform.reset(); // Resetea el formulario
              this.isEditing = false; // Desactiva la edición
            },
            (error) => {
              console.error('Error al actualizar el usuario:', error);
            }
          );
      } else {
        console.error('El ID es necesario para actualizar el usuario.');
      }
    } else {
      console.log('Formulario inválido');
      this.userform.markAllAsTouched(); // Marca todos los campos como tocados para mostrar los errores
    }
  }
  
  async volver(){
    this.router.navigate(['/socios'])
  }
  
}