import { AfterViewInit, Component, ElementRef, ViewChild } from '@angular/core';
import { FooterComponent } from '../footer/footer.component';
import { NavbarComponent } from '../navbar/navbar.component';

@Component({
  selector: 'app-tablero',
  standalone: true,
  imports: [FooterComponent, NavbarComponent],
  templateUrl: './tablero.component.html',
  styleUrls: ['./tablero.component.css']
})
export class TableroComponent implements AfterViewInit {

  @ViewChild(NavbarComponent) navbar!: NavbarComponent;
  @ViewChild('video', { static: false }) videoElement!: ElementRef<HTMLVideoElement>;

  ngAfterViewInit(): void {
    if (this.videoElement?.nativeElement) {
      const video = this.videoElement.nativeElement;
      // Refuerza las propiedades para asegurarte de que el video esté silenciado, en bucle y se reproduzca en línea.
      video.muted = true;
      video.loop = true;
      video.setAttribute('playsinline', '');
      
      // Espera a que los metadatos estén cargados para intentar reproducir el video.
      video.addEventListener('loadedmetadata', () => {
        video.play().catch(error => {
          console.warn('⚠️ Reproducción automática bloqueada. Se requiere interacción del usuario.', error);
        });
      });
    }
  }

  triggerNavbarNext(): void {
    if (this.navbar) {
      this.navbar.siguiente();
    }
  }
}
