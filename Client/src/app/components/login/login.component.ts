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
          const token = response.access_token;
          localStorage.setItem('token', token);
          console.log('Login exitoso');
          this.router.navigate(['/menu/admin'])
        },
        error => {
          console.error('Error de autenticación:', error);
        }
      );
    }
  }
}