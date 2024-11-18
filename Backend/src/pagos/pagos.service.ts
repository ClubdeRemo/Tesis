import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Pagos } from './entities/pago.entity';
import { User } from '../user/entities/user.entity';
import { CreatePagosDto } from './dto/create-pago.dto';

@Injectable()
export class PagoService {
  constructor(
    @InjectRepository(Pagos) private readonly pagoRepo: Repository<Pagos>,
    @InjectRepository(User) private readonly userRepository: Repository<User>,
  ) {}

  // Función para crear un nuevo pago
  async crearPago(createPagosDto: CreatePagosDto): Promise<Pagos> {
    // Verificar si el usuario existe por el ID
    const user = await this.userRepository.findOne({
      where: { Id: createPagosDto.UserId },  // Buscar al usuario por su ID
    });

    if (!user) {
      throw new Error('Usuario no encontrado');
    }

    // Crear el objeto de pago, asegurándonos de que el UserId sea un número
    const pago = this.pagoRepo.create({
      ...createPagosDto, // Usamos spread para los otros campos
      UserId: createPagosDto.UserId, // Aseguramos que el UserId se pase correctamente
    });

    // Guardamos el pago en la base de datos
    return this.pagoRepo.save(pago);
  }

  // Función para obtener todos los pagos de un usuario
  async obtenerPagosPorUsuario(userId: number): Promise<Pagos[]> {
    // Aquí pasamos el 'UserId' correctamente para filtrar los pagos por el ID del usuario
    return this.pagoRepo.find({
      where: { UserId: userId },
      relations: ['user'], // Esto carga la relación con el usuario
    });
  }
}
