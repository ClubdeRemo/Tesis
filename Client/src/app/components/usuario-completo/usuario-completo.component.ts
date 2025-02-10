import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormControl, FormGroup, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { User } from '../../interfaces/User';
import { UsersService } from '../../services/users.service';

@Component({
  selector: 'app-usuario-completo',
  standalone: true,
  imports: [    CommonModule,
    ReactiveFormsModule,
    FormsModule],
  templateUrl: './usuario-completo.component.html',
  styleUrl: './usuario-completo.component.css'
})
export class UsuarioCompletoComponent {
  userform: FormGroup | any;
  socio: User | null = null;

  constructor(
    private router: Router,
    private usersService: UsersService,
    private activatedRoute: ActivatedRoute
  ) { 
    this.userform = new FormGroup({
      Id: new FormControl({ value: '', disabled: true }), 
      Nombre: new FormControl({ value: '', disabled: true }),
      Apellido: new FormControl({ value: '', disabled: true }),
      Email: new FormControl({ value: '', disabled: true }), 
      FechaDeNacimiento: new FormControl({ value: '', disabled: true }),
      Dni: new FormControl({ value: '', disabled: true }),
      Categorias: new FormControl({ value: '', disabled: true })
    });
}

ngOnInit(): void {
  // Captura el ID de la ruta al cargar el componente
  const id = this.activatedRoute.snapshot.paramMap.get('id');

  if (id) {
    // Establece el valor del control de ID y llama al método para buscar el socio
    this.userform.get('Id')?.setValue(id);
    this.buscarSocioPorId();
  }
}


buscarSocioPorId(): void {
  const id = this.userform.get('Id').value;

  if (id) {
    this.usersService.obtenerSocioPorId(id).subscribe((socio) => {
      if (socio) {
        const fechaNacimiento = new Date(socio.FechaDeNacimiento);
        const fechaFormatoCorrecto = `${fechaNacimiento.getFullYear()}-${(fechaNacimiento.getMonth() + 1).toString().padStart(2, '0')}-${fechaNacimiento.getDate().toString().padStart(2, '0')}`;
        
        this.userform.patchValue({
          Nombre: socio.Nombre,
          Apellido: socio.Apellido,
          Email: socio.Email,
          FechaDeNacimiento: fechaFormatoCorrecto, 
          Dni: socio.Dni,
          Categorias: socio.Categorias
        });

      } else {
        console.error('Socio no encontrado');
      }
    });
  }
}

async volver(){
  this.router.navigate(['/socios'])
}
}