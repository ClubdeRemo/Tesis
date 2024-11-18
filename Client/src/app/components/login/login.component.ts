import { Component } from '@angular/core';
import { ReactiveFormsModule, FormBuilder, FormGroup, FormControl, Validators } from '@angular/forms';
import { NavbarComponent } from "../navbar/navbar.component";
import { FooterComponent } from "../footer/footer.component";
import { AuthService } from '../../services/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [ReactiveFormsModule, NavbarComponent, FooterComponent],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent {
  loginForm: FormGroup;

  constructor(private router: Router,private fb: FormBuilder, private authService: AuthService) {
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
          const token = response.token.access_token; // Obtén el token desde la respuesta
          const categoria = response.user.rol; // Obtén el rol (categoría) del usuario
  
          // Almacena el token en el localStorage
          localStorage.setItem('token', token);
  
          console.log('Login exitoso');
  
          // Redirige según la categoría del usuario
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
        }
      );
    }
  }
  
}