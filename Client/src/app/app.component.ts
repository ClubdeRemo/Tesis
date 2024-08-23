import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { TableroComponent } from './components/tablero/tablero.component';
import { UsersFormComponent } from './components/users-form/users-form.component';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, UsersFormComponent, TableroComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  title = 'client';
}

/* Es necesario crear un componente para el index? Si lo creo como tablero el cual es la pag inicial donde entramos, pero 
al no tenerlo creado, pongo el index. El index funciona con las etiquetas <app-root> pero creo que se duplican con el de tablero
No funciona el css
Como vinculamos "Crear Socio"? Este juega un rol en el navbar de html index.
*/