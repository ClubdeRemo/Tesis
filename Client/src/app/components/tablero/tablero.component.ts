import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { FooterComponent } from '../footer/footer.component';

import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button'; // Si necesitas botones también
@Component({
  selector: 'app-tablero',
  standalone: true,
  imports: [FooterComponent, MatCardModule],
  templateUrl: './tablero.component.html',
  styleUrl: './tablero.component.css'
})
export class TableroComponent implements OnInit {
  constructor(private router: Router) { }
  ngOnInit(): void {
  }

  @ViewChild('video') videoElement!: ElementRef<HTMLVideoElement>; //HTMLVideoElement: Es el tipo nativo del DOM que Angular utiliza para manipular un elemento <video>. Este tipo incluye propiedades como muted, play(), pause(), etc.

  ngAfterViewInit(): void {
    if (this.videoElement) {
      this.videoElement.nativeElement.muted = true;
    }
  }
  siguiente(){this.router.navigate(['login']);}
}





