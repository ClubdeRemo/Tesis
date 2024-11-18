import { CommonModule } from '@angular/common';
import { Component, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatPaginator, MatPaginatorModule } from '@angular/material/paginator';
import { MatHeaderRow, MatRow, MatTableDataSource, MatTableModule } from '@angular/material/table';
import { User } from '../../interfaces/User';
import { Router } from '@angular/router';
import { UsersService } from '../../services/users.service';
import { FooterComponent } from '../footer/footer.component';
import { RouterModule } from '@angular/router';
import { MatIconModule } from '@angular/material/icon'; 
import { UsersFormComponent } from '../users-form/users-form.component';
import { lastValueFrom } from 'rxjs';

@Component({
  selector: 'app-gestion-socios',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    MatInputModule,
    MatButtonModule,
    MatCardModule,
    FormsModule,
    MatPaginatorModule,
    MatTableModule,
    CommonModule,
    RouterModule,
    MatIconModule,
  ],
  templateUrl: './gestion-socios.component.html',
  styleUrls: ['./gestion-socios.component.css'] 
})
export class GestionSociosComponent implements OnInit {
  
  displayedColumns: string[] = ['Id', 'Nombre', 'Apellido', 'Dni', 'EstadoSocio', 'Acciones'];
  dataSource: MatTableDataSource<User>;

  @ViewChild(MatPaginator) paginator: MatPaginator | any;

  constructor(private router: Router, private usersService: UsersService) {
    this.dataSource = new MatTableDataSource<User>([]); // Inicializamos la tabla vacía
  }

  async ngOnInit(): Promise<void> {
    try {
      // Llama al servicio para obtener los datos desde la base de datos
      const data: User[] = await this.usersService.obtenerDatos();
      this.dataSource = new MatTableDataSource<User>(data); // Pasa los datos a la tabla
    } catch (error) {
      console.error('Error al cargar los datos:', error);
    }
  }

  ngAfterViewInit(): void {
    // Conecta el paginador a la tabla después de que la vista ha sido inicializada
    this.dataSource.paginator = this.paginator;
  }

  // Método para aplicar un filtro en la tabla
  aplicarFiltro(event: Event) {
    const filtroValor = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filtroValor.trim().toLowerCase();
  }

  async eliminarSocio(Id: string) {
    const confirmacion = confirm("¿Estás seguro de que deseas eliminar a este socio?");
    if (confirmacion) {
      try {
        const resultado = await this.usersService.eliminarSocio(Id);
        if (resultado) {
          alert("Socio eliminado correctamente.");
          // Actualizar los datos en la tabla
          const datosActualizados = await this.usersService.obtenerDatos(); 
          this.dataSource.data = datosActualizados; 
        } else {
          alert("Hubo un error al intentar eliminar al socio.");
        }
      } catch (error) {
        console.error("Error al eliminar socio:", error);
        alert("Hubo un error al intentar eliminar al socio.");
      }
    }
  }

  async modificar(Id: string): Promise<void> {
    if (!Id) {
      console.error('Error: El ID es undefined o null');
      return;
    }
  
    try {
      const usuario = await lastValueFrom(this.usersService.obtenerSocioPorId(Id));
      console.log('Usuario obtenido:', usuario);
  
      if (usuario) {
        // Navegar al componente de modificación con parámetros adicionales
        this.router.navigate(['/modificar', Id], {
          queryParams: { autocompletar: true },
        });
      } else {
        console.error('Error: No se encontró el usuario con el ID proporcionado');
      }
    } catch (error) {
      console.error('Error al obtener los datos:', error);
    }
  }

  async lista(Id: string): Promise<void> {
    if (!Id) {
      console.error('Error: El ID es undefined o null');
      return;
    }
  
    try {
      const usuario = await lastValueFrom(this.usersService.obtenerSocioPorId(Id));
      console.log('Usuario obtenido:', usuario);
  
      if (usuario) {
        // Navegar al componente de modificación con parámetros adicionales
        this.router.navigate(['/usuario/completo', Id], {
          queryParams: { autocompletar: true },
        });
      } else {
        console.error('Error: No se encontró el usuario con el ID proporcionado');
      }
    } catch (error) {
      console.error('Error al obtener los datos:', error);
    }
  }

  getClassByEstado(EstadoSocio: string): string {
    return EstadoSocio === 'Al dia' ? 'estado-al-dia' : '';
  }
}  