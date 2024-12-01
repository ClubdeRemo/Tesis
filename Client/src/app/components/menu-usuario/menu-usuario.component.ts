import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { RouterModule, Router } from '@angular/router'; // Importa Router de Angular
import { User } from '../../interfaces/User';
import { UsersService } from '../../services/users.service';

@Component({
  selector: 'app-menu-usuario',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './menu-usuario.component.html',
  styleUrls: ['./menu-usuario.component.css'] // Corrige 'styleUrl' a 'styleUrls'
})
export class MenuUsuarioComponent {

  totalRecords: number = 0;
  data: User[] = []; 

  constructor(private router: Router, private usersService: UsersService) { }

  async ngOnInit(): Promise<void> {
    try {
      const data: User[] = await this.usersService.obtenerDatos();
      this.totalRecords = data.length;
      this.data = data;
    } catch (error) {
      console.error('Error al cargar los datos:', error);
    }
  }

  historial(userId: number | undefined): void {
    if (userId !== undefined && userId > 0) {
        this.router.navigate(['/historial/pagos', userId]);
    } else {
        console.error('El UserId no es válido.');
    }
}

}
