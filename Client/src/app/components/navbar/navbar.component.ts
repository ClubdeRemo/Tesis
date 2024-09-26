import { Component } from '@angular/core';
import { Router } from '@angular/router';


@Component({
  selector: 'app-navbar',
  standalone: true,
  imports: [],
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.css'
})
export class NavbarComponent {
  constructor(private router: Router) { }
  ngOnInit(): void {
  }
  onLogin(): void {
    // Aquí redirigimos al usuario al componente Login
    this.router.navigate(['/login']);
  }
  siguiente(): void {
    console.log('Método siguiente del NavbarComponent');
  }
}
