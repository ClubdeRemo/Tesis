import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
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



  constructor(private router: Router, private usersService: UsersService, private dialog: MatDialog, private route: ActivatedRoute) {
    this.dataSource = new MatTableDataSource<any>([]); // Inicializamos la tabla vacía
  }

  async ngOnInit(): Promise<void> {
    try {
      // Llama al servicio para obtener los datos desde la base de datos
      const data: User[] = await this.usersService.obtenerDatos();
      this.UserId = +this.route.snapshot.paramMap.get('UserId')!;
      this.pagos = data; // Suponiendo que los pagos también vienen de aquí
      this.dataSource.data = this.pagos; // Pasa los datos a la tabla
    } catch (error) {
      console.error('Error al cargar los datos:', error);
    }
  }

  abrirPagoModal(): void {
    const dialogRef = this.dialog.open(PagoModalComponent, {
      width: '80%', // Ancho de la modal
      data: {}, // Aquí puedes pasar datos si lo necesitas
    });
    dialogRef.afterClosed().subscribe((result) => {
      if (result) {
        this.pagos.push(result); // Agrega el pago al array 'pagos'
        this.dataSource.data = [...this.pagos]; // Actualiza la fuente de datos
      }
    });
  }

  historial(userId: number): void {
    if (userId && userId > 0) {
      this.router.navigate(['/historial/pagos', userId]);
    } else {
      console.error('El UserId no es válido.');
    }
  }
}