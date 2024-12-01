import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Pagos } from './entities/pago.entity';
import { User } from '../user/entities/user.entity';
import { CreatePagosDto } from './dto/create-pago.dto';
import { Cron } from '@nestjs/schedule';

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

    const nuevoPago = await this.pagoRepo.save(pago);

    // Actualiza el estado del socio
    await this.actualizarEstadoSocio(createPagosDto.UserId);
  
    return nuevoPago;
  }

  async calcularEstado(userId: number): Promise<string> {
    const pagos = await this.obtenerPagosPorUsuario(userId);
    const fechaActual = new Date();
//REVISAR SI CUANDO HAY UN PAGO EN MORA NO SE PISA CON INACTIVO
    const tienePagosPendientes = pagos.some(pago => pago.FechaVto < new Date());
     // Determinar si hay pagos con más de 3 meses de vencimiento
    const tienePagosInactivos = pagos.some(pago => {
    const fechaVto = new Date(pago.FechaVto); 
    const diferenciaMeses = (fechaActual.getFullYear() - fechaVto.getFullYear()) * 12 
                        + fechaActual.getMonth() - fechaVto.getMonth();
  return diferenciaMeses > 3; // Más de 3 meses vencido
});
    //pagos.some(...) verifica si al menos uno de los pagos cumple una condición.
    //La condición es que la fecha de vencimiento del pago (pago.FechaVto) sea anterior a la fecha actual (new Date()), 
    //lo que indica un pago vencido.

    /* if (!pagos.length) {
      return 'Inactivo'; // No tiene pagos registrados. Por ahora creo que no hace falta porque el socio se carga predeterminado como 'Al dia'
    }  */

    if (tienePagosInactivos) {
      return 'Inactivo'; // Tiene pagos vencidos mayores a 3 meses
    } else if (tienePagosPendientes) {
      return 'Mora'; // Tiene pagos pendientes de vencer
    } else {
      return 'Al día'; // Todos los pagos están al día
    }
  }

  // Función para obtener todos los pagos de un usuario
  async obtenerPagosPorUsuario(userId: number): Promise<Pagos[]> {
    return this.pagoRepo.find({
      where: { UserId: userId },
      relations: ['user'], // Carga la relación con la tabla 'user'
    });
  }

// Función para actualizar el estado del socio en la tabla 'User'
async actualizarEstadoSocio(userId: number): Promise<void> {
  const estado = await this.calcularEstado(userId);

  console.log(`Pagos del usuario ${userId}:`, await this.obtenerPagosPorUsuario(userId));
  console.log(`Estado calculado para el usuario ${userId}: ${estado}`);
  
  const resultado = await this.userRepository.update({ Id: userId }, { EstadoSocio: estado });
  console.log('Resultado de la actualización:', resultado);

  if (resultado.affected === 0) {
    console.error(`No se pudo actualizar el usuario con Id ${userId}`);
  }
}

  @Cron('0 0 * * *') // Se ejecutará todos los días a medianoche
  async actualizarEstadosUsuarios() {
    const usuarios = await this.userRepository.find();
    for (const usuario of usuarios) {
      await this.actualizarEstadoSocio(usuario.Id);
    }
    console.log('Actualización diaria de estados completada');
  }

}