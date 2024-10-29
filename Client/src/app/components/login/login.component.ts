import { Component } from '@angular/core';
import { UsersService } from '../../services/users.service';
import { ReactiveFormsModule, FormBuilder, FormGroup, FormControl, Validators } from '@angular/forms';
import { User } from '../../interfaces/User';
import { Router } from '@angular/router';
import { NavbarComponent } from "../navbar/navbar.component";
import { FooterComponent } from "../footer/footer.component";

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [ReactiveFormsModule, NavbarComponent, FooterComponent],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent {
  usuarioForm: FormGroup;

  constructor(private fb: FormBuilder, private usersService: UsersService, private router: Router) {
    // Inicialización del formulario usando FormBuilder
    this.usuarioForm = this.fb.group({
      Nombre: ['', Validators.required],
      Contraseña: ['', [Validators.required, Validators.minLength(6)]]
    });
  }

  onSubmit() {
    this.usuarioForm.valid
  }
  

}