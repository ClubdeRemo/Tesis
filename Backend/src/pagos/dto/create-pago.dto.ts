import { IsDate, IsEnum, IsInt } from 'class-validator';

export class CreatePagosDto {
  @IsInt()
  UserId: number; // Este es un número que representa el ID del usuario

  @IsDate()
  FechaPago: Date;

  @IsDate()
  FechaVto: Date;

  @IsEnum(['Efectivo', 'Transferencia'])
  Tipo: 'Efectivo' | 'Transferencia';
}
