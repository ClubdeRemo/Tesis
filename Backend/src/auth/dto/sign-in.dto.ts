
import { IsNotEmpty, IsNumber, IsString } from 'class-validator';

export class SignInDto {
    @IsNumber()
    @IsNotEmpty()
    Id: number;

    @IsString()
    @IsNotEmpty()
    Nombre: string;

    @IsString()
    @IsNotEmpty()
    Contraseña: string;
}
