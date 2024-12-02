import { Component, OnInit } from '@angular/core';
import { ReactiveFormsModule, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { NavbarComponent } from "../navbar/navbar.component";
import { FooterComponent } from "../footer/footer.component";
import { AuthService } from '../../services/auth.service';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';  // Agregar esta importación
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [ReactiveFormsModule, NavbarComponent, CommonModule],  // Agregar CommonModule
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  loginForm!: FormGroup;
  isModalVisible: boolean = false;  // Para mostrar el modal en caso de error
  modalMessage: string = '';  // Mensaje que se mostrará en el modal
  showPassword: boolean = false;  // Controla la visibilidad de la contraseña

  constructor(
    private authService: AuthService,
    private router: Router,
    private fb: FormBuilder
  ) {}

  ngOnInit(): void {
    // Crear el formulario de login con validaciones
    this.loginForm = this.fb.group({
      Id: ['', Validators.required],  // N°Socio
      Nombre: ['', Validators.required],  // Nombre
      Contraseña: ['', Validators.required],  // Contraseña
    });
  }

  // Método para manejar el envío del formulario
  async onSubmit() {
    if (this.loginForm.invalid) {
      // Si el formulario no es válido, no se hace nada
      return;
    }
  
    const credentials = this.loginForm.value;
  
    try {
      const response = await this.authService.signIn(credentials).toPromise();
  
      // Asegúrate de que la respuesta tenga el id, token y rol
      if (response && response.user && response.user.id && response.user.rol) {
        const userId = response.user.id;  // Obtiene el id desde la respuesta
        const token = response.token;  // Obtiene el token desde la respuesta
        const rol = response.user.rol;  // Obtiene el rol desde la respuesta
  
        // Almacena el token y el id (puedes usar localStorage o lo que prefieras)
        localStorage.setItem('access_token', token);
        localStorage.setItem('user_id', userId);
  
        // Redirige según el rol del usuario
        if (rol === 'Admin') {
          this.router.navigate(['/menu/admin']);
        } else {
          this.router.navigate([`/menu/usuario/${userId}`]);
        }
      } else {
        throw new Error('Respuesta de autenticación inválida');
      }
    } catch (error: any) {
      // Si hay un error durante la autenticación, mostrar el modal de error
      this.modalMessage = 'Error de autenticación: ' + error.message;
      this.isModalVisible = true;
      console.error(error);
    }
  }
  
  // Método para abrir el modal de error
  openModal(): void {
    this.isModalVisible = true;
  }

  // Método para cerrar el modal
  closeModal(): void {
    this.isModalVisible = false;
  }

  // Método para mostrar u ocultar la contraseña
  togglePasswordVisibility(): void {
    this.showPassword = !this.showPassword;
  }
}