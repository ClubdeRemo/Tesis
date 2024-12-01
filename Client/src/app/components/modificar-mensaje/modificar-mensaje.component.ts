import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogModule, MatDialogRef } from '@angular/material/dialog';
import { AbstractControl, FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { ReportesService } from '../../services/reportes.service';
import { CommonModule } from '@angular/common';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';

@Component({
  selector: 'app-modificar-mensaje',
  standalone: true,
  imports: [
    CommonModule,
    MatDialogModule,
    MatFormFieldModule,
    MatInputModule,
    ReactiveFormsModule
  ],
  templateUrl: './modificar-mensaje.component.html',
  styleUrls: ['./modificar-mensaje.component.css']
})
export class ModificarMensajeComponent {
  mensajeForm: FormGroup;
  idMensaje: number;

  constructor(
    private fb: FormBuilder,
    private reportesService: ReportesService,
    public dialogRef: MatDialogRef<ModificarMensajeComponent>,
    @Inject(MAT_DIALOG_DATA) public data: { id: number, mensaje: string }
  ) {
    this.idMensaje = data.id;
    this.mensajeForm = this.fb.group({
      Mensaje: [data.mensaje, [Validators.required, maxWordLengthValidator(25), Validators.maxLength(1000)]]
    });
  }

  // Método para guardar el mensaje modificado
  async guardar(): Promise<void> {
    if (this.mensajeForm.valid) {
      try {
        const nuevoMensaje = this.mensajeForm.value.Mensaje;
        await this.reportesService.modificarMensaje(this.idMensaje, nuevoMensaje);
        this.dialogRef.close(nuevoMensaje); // Cerrar el modal y pasar el nuevo mensaje
      } catch (error) {
        console.error('Error al modificar el mensaje', error);
      }
    } else {
      console.log('Formulario inválido');
    }
  }

  // Cerrar el modal sin cambios
  cerrar(): void {
    this.dialogRef.close();
  }
}
export function maxWordLengthValidator(maxLength: number) {
  return (control: AbstractControl) => {
    const value = control.value ? control.value.toString() : '';
    const words: string[] = value.split(/\s+/);
    const hasLongWord = words.some((word: string) => word.length > maxLength);
    return hasLongWord ? { 'maxWordLength': { value: control.value } } : null;
  };
}