import { Component } from '@angular/core';
import { ReactiveFormsModule, FormBuilder, FormGroup } from '@angular/forms';
import { UsersService } from '../../services/users.service';
import { User } from '../../interfaces/User';

@Component({
  selector: 'app-users-form',
  standalone: true,
  imports: [ReactiveFormsModule],
  templateUrl: './users-form.component.html',
  styleUrl: './users-form.component.css'
})
export class UsersFormComponent {
  usuarioForm: FormGroup;

  constructor(private fb: FormBuilder, private usersService: UsersService) {
    this.usuarioForm = this.fb.group({
      username: [''],
      apellido: [''],
      email: [''],
      password: [''],
      birthdate: [''],
      dni: ['']
    });
  }

  onSubmit() {
    if (this.usuarioForm.valid) {
      const userData: User = this.usuarioForm.value;
      this.usersService.createUser(userData).subscribe({
        next: (response: User) => {
          console.log('Usuario creado con exito:', response);
          this.usuarioForm.reset();
        },
        error: (error: any) => {
          console.error('Error al intentar crear usuario:', error);
        },
        complete: () => {
          console.log('Operación completada.');
        }
      });
    }
  }

}