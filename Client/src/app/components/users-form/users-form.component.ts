import { Component, OnInit } from '@angular/core';
import { ReactiveFormsModule, FormBuilder, FormGroup, FormControl, FormsModule } from '@angular/forms';
import { UsersService } from '../../services/users.service';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';

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

/* 
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
 */
/*   onSubmit() {
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
  } */

    userform: FormGroup | any;
    sort: any;
    paginator: any;
    constructor(private router: Router,
      private backendService: UsersService
    ) { }
  async ngOnInit(): Promise<void> {
    this.userform = new FormGroup({
      Nombre: new FormControl(''),
      Apellido: new FormControl(''),
      Email: new FormControl(''),
      Contraseña: new FormControl(''), 
      FechaDeNacimiento: new FormControl(''),
      Dni: new FormControl('')

    });
      const data= await this.backendService.obtenerDatos()

  }
  siguiente(){
    this.router.navigate(['']);  
  }
  onSubmit(): void {
    console.log(this.userform.value)
    this.backendService.enviarDatos(this.userform.value); // Imprime los valores del formulario en la consola
    this.userform.reset();
}
}