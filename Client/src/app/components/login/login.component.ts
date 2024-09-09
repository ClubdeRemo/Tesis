import { Component } from '@angular/core';
import { UsersService } from '../../services/users.service';
import { ReactiveFormsModule, FormBuilder, FormGroup } from '@angular/forms';
import { User } from '../../interfaces/User';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [ReactiveFormsModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent {
/*  usuarioForm: FormGroup;

  constructor(private fb: FormBuilder, private usersService: UsersService) {
    this.usuarioForm = this.fb.group({
      username: [''],
      password: ['']
    });
  }

  onSubmit() {
    if (this.usuarioForm.valid) {
      const userData: User = this.usuarioForm.value;
      this.usersService.createUser(userData).subscribe({
        next: (response: User) => {
          console.log('Ingreso exitoso:', response);
        },
        error: (error: any) => {
          console.error('Error al intentar ingresar:', error);
        },
        complete: () => {
          console.log('Operación completada.');
        }
      });
    }
  }
 */
}
