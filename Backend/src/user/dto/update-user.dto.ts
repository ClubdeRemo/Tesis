import { PartialType } from '@nestjs/mapped-types';
import { CreateUserDto } from './create-user.dto';
import { IsEnum } from 'class-validator';

export enum EstadoSocioEnum {
    AlDia = 'Al dia',
    Mora = 'Mora',
    Inactivo = 'Inactivo',
}
export class UpdateUserDto extends PartialType(CreateUserDto) {
    @IsEnum(EstadoSocioEnum, { message: 'EstadoSocio debe ser Al dia, Mora o Inactivo' })
    EstadoSocio?: EstadoSocioEnum;
}
