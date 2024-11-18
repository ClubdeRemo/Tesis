import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';


@Component({
  selector: 'app-navbar',
  standalone: true,
  imports: [MatButtonModule, MatIconModule],
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.css'
})
export class NavbarComponent {
  constructor(private router: Router) { }
  ngOnInit(): void {
  }
  onHome(): void {
    this.router.navigate(['/']);  // Redirige a la página principal
  }
  onLogin1(): void {
    this.router.navigate(['/login']);
  }
  onLogin2(): void {
    this.router.navigate(['/historia']);
  }
  onLogin3(): void {
    this.router.navigate(['/reportes']);
  }
  volver(): void {
    this.router.navigate(['/login']);
  }
  siguiente(): void {
    console.log('Método siguiente del NavbarComponent');
  }
  goToManual() {
    this.router.navigate(['/manual']);
  }
}