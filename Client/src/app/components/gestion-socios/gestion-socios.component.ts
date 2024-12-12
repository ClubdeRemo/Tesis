import { CommonModule } from '@angular/common';
import { Component, OnInit, ViewChild } from '@angular/core';
import { MatCardModule } from '@angular/material/card';
import { MatTableModule } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';
import { Router } from '@angular/router';
import { UsersService } from '../../services/users.service';
import { MatIconModule } from '@angular/material/icon';
import { RouterModule } from '@angular/router';
import { MatButtonModule } from '@angular/material/button';
import { lastValueFrom } from 'rxjs';
import { User } from '../../interfaces/User';
import { MatTableDataSource } from '@angular/material/table';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatInputModule } from '@angular/material/input';
import { MatTooltipModule } from '@angular/material/tooltip';

@Component({
  selector: 'app-gestion-socios',
  standalone: true,
  imports: [
    CommonModule,
    MatCardModule,
    MatTableModule,
    RouterModule,
    MatIconModule,
    MatButtonModule,
    ReactiveFormsModule,
    MatInputModule,
    MatTooltipModule
  ],
  providers: [UsersService],
  templateUrl: './gestion-socios.component.html',
  styleUrls: ['./gestion-socios.component.css']
})
export class GestionSociosComponent implements OnInit {
  
  displayedColumns: string[] = ['Id', 'Nombre', 'Apellido', 'Dni', 'EstadoSocio', 'Acciones'];
  dataSource: MatTableDataSource<User>;
  totalRecords: number = 0; // Total de registros
  currentPage: number = 0;  // Página actual
  pageSize: number = 5;     // Tamaño de la página
  data: User[] = []; // Datos originales para la tabla completa
  dniForm: FormGroup;
  usuarioEncontrado: { nombre: string; apellido: string } | null = null;
  currentDate: string = '';
  
  @ViewChild(MatPaginator) paginator: MatPaginator | any;
  
  constructor(private router: Router, private usersService: UsersService, private fb: FormBuilder) {
    this.dataSource = new MatTableDataSource<User>(this.data); // Inicializa con los datos originales
    this.dniForm = this.fb.group({
      dni: ['', [
        Validators.required,
        Validators.pattern(/^\d{8}$/) // Validación para que el DNI tenga exactamente 8 dígitos numéricos
      ]]
    });
    const today = new Date();
    this.currentDate = today.toLocaleDateString();
  }
  
  async ngOnInit(): Promise<void> {
    try {
      // Llama al servicio para obtener los datos desde la base de datos
      const data: User[] = await this.usersService.obtenerDatos();
      this.totalRecords = data.length; // Establecemos el total de registros
      this.data = data;  // Guardamos los datos completos
      this.updateDataSource(); // Inicializamos la tabla con los datos de la primera página
    } catch (error) {
      console.error('Error al cargar los datos:', error);
    }
  }

  // Método para actualizar los datos mostrados en la tabla según la página actual
  updateDataSource(): void {
    const startIndex = this.currentPage * this.pageSize;
    const endIndex = startIndex + this.pageSize;
    this.dataSource.data = this.data.slice(startIndex, endIndex); // Paginamos los datos
  }

  // Método para manejar el cambio de página
  cambiarPagina(event: any): void {
    this.currentPage = event.pageIndex; // Establecer la página actual
    this.pageSize = event.pageSize; // Establecer el tamaño de la página
    this.updateDataSource(); // Actualizar los datos mostrados
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
        this.router.navigate(['/modificar', Id], { queryParams: { autocompletar: true } });
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
        this.router.navigate(['/usuario/completo', Id], { queryParams: { autocompletar: true } });
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

  async buscarUsuario(): Promise<void> {
    if (this.dniForm.valid) {
      const dni = this.dniForm.get('dni')?.value;
      try {
        // Llama al servicio para buscar el usuario por DNI
        const user = await this.usersService.obtenerPorDni(dni);
        if (user) {
          this.dataSource = new MatTableDataSource<User>([user]); // Actualiza la tabla con el usuario encontrado
          this.usuarioEncontrado = { nombre: user.Nombre, apellido: user.Apellido }; // Asigna los valores obtenidos
        } else {
          console.log('Usuario no encontrado con DNI:', dni);
          this.usuarioEncontrado = null; // Si no se encuentra, restablece el usuario encontrado
          this.dataSource = new MatTableDataSource<User>([]); // Limpia la tabla
        }
      } catch (error) {
        console.error('Error al buscar el usuario:', error);
        this.dataSource = new MatTableDataSource<User>([]); // Limpia la tabla en caso de error
      }
    }
  }

  refrescarFormulario(): void {
    this.dataSource = new MatTableDataSource<User>(this.data); // Restaura los datos originales
    this.dniForm.reset(); // Limpia el formulario
    this.usuarioEncontrado = null; // Resetea cualquier búsqueda previa
    this.currentPage = 0; // Reinicia la página actual
    this.updateDataSource(); // Actualiza los datos según la paginación
  }
  async volver(){
    this.router.navigate(['/menu/admin'])
  }
}