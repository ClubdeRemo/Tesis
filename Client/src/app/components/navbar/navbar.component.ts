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
}
