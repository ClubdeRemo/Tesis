import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { RouterModule, Router } from '@angular/router'; // Importa Router de Angular
import { User } from '../../interfaces/User';
import { UsersService } from '../../services/users.service';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-menu-usuario',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './menu-usuario.component.html',
  styleUrls: ['./menu-usuario.component.css'] // Corrige 'styleUrl' a 'styleUrls'
})
export class MenuUsuarioComponent {
  userId: string | null = localStorage.getItem('user_id');
  totalRecords: number = 0;
  data: User[] = []; 

  constructor(private router: Router, private usersService: UsersService, private authService: AuthService) { }

  async ngOnInit(): Promise<void> {
    try {
      const data: User[] = await this.usersService.obtenerDatos();
      this.totalRecords = data.length;
      this.data = data;
    } catch (error) {
      console.error('Error al cargar los datos:', error);
    }
  }
  historial(userId: string | null): void {
    if (userId) {
      this.router.navigate([`/historial/pagos/${userId}`]);
    } else {
      // Si userId es null, redirigir al login o mostrar un mensaje de error
      this.router.navigate(['/login']);
    }
  }
  
}
