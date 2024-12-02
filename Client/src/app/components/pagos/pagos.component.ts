import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { ActivatedRoute, RouterModule } from '@angular/router';
import { User } from '../../interfaces/User';
import { Router } from '@angular/router';
import { UsersService } from '../../services/users.service';
import { MatDialog, MatDialogModule } from '@angular/material/dialog'; // Importar MatDialog
import { PagoModalComponent } from '../pago-modal/pago-modal.component';
import { MatTooltipModule } from '@angular/material/tooltip';
import { PagosService } from '../../services/pagos.service';
import { lastValueFrom } from 'rxjs'; 
import { Pagos } from '../../interfaces/Pagos';


@Component({
  selector: 'app-pagos',
  standalone: true,
  imports: [CommonModule,
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
    MatDialogModule,
    MatTooltipModule
  ],
  templateUrl: './pagos.component.html',
  styleUrl: './pagos.component.css'
})
export class PagosComponent implements OnInit {

  displayedColumns: string[] = ['Id', 'Socio', 'Gestión', 'Acciones'];
  dataSource: MatTableDataSource<any>; // Cambié 'User' por 'any' para incluir pagos
  pagos: any[] = []; // Declara la propiedad 'pagos' como un array vacío
  UserId!: number;
  dniForm: FormGroup;
  currentPage: number = 0;
  usuarioEncontrado: { nombre: string; apellido: string } | null = null;
  pageSize: number = 5; 
  data: User[] = []; 
  totalRecords: number = 0;

  constructor(private router: Router, private pagosService: PagosService, private usersService: UsersService, private dialog: MatDialog, private route: ActivatedRoute, private fb: FormBuilder) {
    this.dataSource = new MatTableDataSource<any>([]); // Inicializamos la tabla vacía
    this.dniForm = this.fb.group({
      dni: ['', [
        Validators.required,
        Validators.pattern(/^\d{8}$/) // Validación para que el DNI tenga exactamente 8 dígitos numéricos
      ]]
    });
  
  }

  async ngOnInit(): Promise<void> {
    try {
      // Obtén los datos de los usuarios
      const data: User[] = await this.usersService.obtenerDatos();
      this.totalRecords = data.length;
      this.data = data;
  
      // Inicializa el dataSource con los datos de la primera página
      this.updateDataSource();
    } catch (error) {
      console.error('Error al cargar los datos:', error);
    }
  }
  
  updateDataSource(): void {
    const startIndex = this.currentPage * this.pageSize;
    const endIndex = startIndex + this.pageSize;
    this.dataSource = new MatTableDataSource<any>(this.data.slice(startIndex, endIndex)); // Paginamos los datos
  }
  
  async abrirPagoModal(Socio: any): Promise<void> {
    console.log('Usuario seleccionado:', Socio);
  
    const dialogRef = this.dialog.open(PagoModalComponent, {
      width: '80%',
      data: { UserId: Socio.Id },
    });
  
    dialogRef.afterClosed().subscribe(async (result: Pagos) => {
      if (result) {
        try {
          // Verifica que UserId sea un número
          const userId = Socio.Id ?? 0; // Si es undefined, asigna 0 como predeterminado
  
          result.UserId = userId;
  
          await lastValueFrom(this.pagosService.agregarPago(result));
          console.log('Pago guardado exitosamente:', result);
  
          // Actualiza el estado del socio y la lista de pagos
          const { pagos, estado } = await this.pagosService.obtenerDatos(userId);
  
          this.pagos = pagos;
          this.dataSource.data = [...this.pagos];
          Socio.EstadoSocio = estado; // Actualiza el estado localmente
          await this.actualizarUsuarios();
        } catch (error) {
          console.error('Error al guardar el pago:', error);
        }
      }
    });
  }
  
  // Método para recargar la lista de usuarios dinámicamente
  async actualizarUsuarios(): Promise<void> {
    try {
      const data: User[] = await this.usersService.obtenerDatos();
      this.dataSource.data = data; // Refresca la tabla con los datos actualizados
      console.log('Usuarios actualizados:', data);
    } catch (error) {
      console.error('Error al actualizar la lista de usuarios:', error);
    }
  }
  
  historial(userId: number): void {
    if (userId && userId > 0) {
      this.router.navigate(['/historial/pagos', userId]);
    } else {
      console.error('El UserId no es válido.');
    }
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
}
