import { PartialType } from '@nestjs/mapped-types';
import { CreateUserDto } from './create-user.dto';

export class UpdateUserDto extends PartialType(CreateUserDto) {}

// El uso de PartialType es una forma de definir DTOs de actualización. 
// Permite que todas las propiedades del DTO original se conviertan en opcionales,
// facilitando la reutilización del código y simplificando el mantenimiento.

// Otra opcion

/* export class UpdateUserDto{
    username: string;
    password: string;
}
 */