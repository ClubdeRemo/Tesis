import { Type } from 'class-transformer';
import { IsDate, IsEnum, IsInt, IsNotEmpty, IsNumber, IsPositive } from 'class-validator';
import { Column } from 'typeorm';

export class CreatePagosDto {
  @IsInt()
  UserId: number; // Este es un número que representa el ID del usuario

  @IsDate()
  @Type(() => Date) // Necesario si usas class-transformer
  FechaPago: Date;
  
  @IsDate()
  @Type(() => Date)
  FechaVto: Date;
  

  @IsEnum(['Efectivo', 'Transferencia'])
  Tipo: 'Efectivo' | 'Transferencia';

  @IsNotEmpty()
  @IsNumber({ allowInfinity: false, allowNaN: false }, { message: 'Monto debe ser un número válido.' })
  @IsPositive({ message: 'Monto debe ser un número positivo.' })
  Monto: number;
}
