import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { TableroComponent } from './components/tablero/tablero.component';
import { UsersFormComponent } from './components/users-form/users-form.component';
import { GestionSociosComponent } from './components/gestion-socios/gestion-socios.component';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, UsersFormComponent, TableroComponent, GestionSociosComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  title = 'client';
}
