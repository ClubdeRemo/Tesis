import { Component } from '@angular/core';
import { ReactiveFormsModule, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { NavbarComponent } from "../navbar/navbar.component";
import { FooterComponent } from "../footer/footer.component";
import { AuthService } from '../../services/auth.service';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';  // Agregar esta importación

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [ReactiveFormsModule, NavbarComponent, FooterComponent, CommonModule],  // Agregar CommonModule
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {
  loginForm: FormGroup;
  isModalVisible: boolean = false;
  modalMessage: string = '';

  constructor(private router: Router, private fb: FormBuilder, private authService: AuthService) {
    this.loginForm = this.fb.group({
      Id: ['', Validators.required],
      Nombre: ['', Validators.required],
      Contraseña: ['', Validators.required]
    });
  }

  onSubmit() {
    if (this.loginForm.valid) {
      this.authService.signIn(this.loginForm.value).subscribe(
        response => {
          const token = response.token.access_token;
          const categoria = response.user.rol;
  
          localStorage.setItem('token', token);
  
          console.log('Login exitoso');
  
          if (categoria === 'Admin') {
            this.router.navigate(['/menu/admin']);
          } else if (categoria === 'Usuario') {
            this.router.navigate(['/menu/usuario']);
          } else {
            console.warn('Rol no reconocido');
          }
        },
        error => {
          console.error('Error de autenticación:', error);
          this.modalMessage = 'Hubo un error al iniciar sesión. Verifique sus datos e intente nuevamente.';
          this.isModalVisible = true;
        }
      );
    }
  }

  closeModal() {
    this.isModalVisible = false;
  }
}