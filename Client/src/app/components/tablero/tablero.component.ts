import { Component, ElementRef, HostListener, OnInit, ViewChild } from '@angular/core';
import { FooterComponent } from '../footer/footer.component';
import { NavbarComponent } from '../navbar/navbar.component';
import { LoginComponent } from '../login/login.component';

@Component({
  selector: 'app-tablero',
  standalone: true,
  imports: [FooterComponent, NavbarComponent],
  templateUrl: './tablero.component.html',
  styleUrl: './tablero.component.css'
})
export class TableroComponent implements OnInit {

  @ViewChild(NavbarComponent) navbar!: NavbarComponent;
  @ViewChild('video') videoElement!: ElementRef<HTMLVideoElement>;

  ngOnInit(): void {
  }

  ngAfterViewInit(): void {
    // Elimina la invocación automática de 'siguiente()'
    // Si necesitas hacer algo con el Navbar, hazlo condicionalmente en eventos de usuario
    if (this.navbar) {
      console.log('NavbarComponent cargado correctamente');
      // La invocación de `siguiente` será bajo ciertas condiciones o eventos de usuario
    } else {
      console.warn('NavbarComponent no está disponible');
    }
  }

  
  // Aquí podrías tener un método que invoque el siguiente cuando sea necesario, por ejemplo:
  triggerNavbarNext(): void {
    if (this.navbar) {
      this.navbar.siguiente();
    }
  }
}