import { Component, OnInit } from '@angular/core';
import { ReactiveFormsModule, FormBuilder, FormGroup, FormControl, FormsModule, Validators, AbstractControl } from '@angular/forms';
import { UsersService } from '../../services/users.service';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { User } from '../../interfaces/User';

@Component({
  selector: 'app-users-form',
  standalone: true,
  imports: [ CommonModule,
    ReactiveFormsModule,
    FormsModule],
  templateUrl: './users-form.component.html',
  styleUrl: './users-form.component.css',
  providers: [UsersService]
})
export class UsersFormComponent implements OnInit {
    userform: FormGroup | any;
    constructor(private router: Router,
      private usersService: UsersService, private formBuilder: FormBuilder
    ) { }
    ngOnInit(): void {
      // Inicializa el formulario con sus controles y validaciones
      this.userform = new FormGroup({
        Nombre: new FormControl('', [Validators.required, Validators.minLength(3)]),
        Apellido: new FormControl('', [Validators.required, Validators.minLength(3)]),
        Email: new FormControl('', [Validators.required, Validators.email]),
        Contraseña: new FormControl('', [Validators.required, Validators.minLength(6)]), 
        FechaDeNacimiento: new FormControl('', [Validators.required, this.fechaNoPosterior()]), 
        Dni: new FormControl('', [Validators.required, Validators.pattern('^[0-9]*$')])
      });
    }
    fechaNoPosterior() {
      return (control: AbstractControl
      ) => {
        const fechaIngresada = new Date(control.value);
        const fechaActual = new Date();
        if (fechaIngresada > fechaActual) {
          return { fechaPosterior: true };
        }
        return null; // Si no hay error
      };
    }

onSubmit(): void {
    if (this.userform.valid) {
      console.log('Formulario válido:', this.userform.value);
      this.usersService.enviarDatos(this.userform.value);
      this.userform.reset();
    } else {
      console.log('Formulario inválido');
      this.userform.markAllAsTouched();
      this.userform.reset()
    }
  }
}