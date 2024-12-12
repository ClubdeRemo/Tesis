import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Between, Repository } from 'typeorm';
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
    const now = new Date();
    // Crear el objeto de pago, asegurándonos de que el UserId sea un número
    const pago = this.pagoRepo.create({
      ...createPagosDto, // Usamos spread para los otros campos
      UserId: createPagosDto.UserId, // Aseguramos que el UserId se pase correctamente
      FechaPago: createPagosDto.FechaPago || now,
    });

    const nuevoPago = await this.pagoRepo.save(pago);

    // Actualiza el estado del socio
    await this.actualizarEstadoSocio(createPagosDto.UserId);
  
    return nuevoPago;
  }

  // Función para calcular el estado basado en los pagos
  async calcularEstado(userId: number): Promise<string> {
    const pagos = await this.obtenerPagosPorUsuario(userId);
    const fechaActual = new Date();
    
    const tienePagosPendientes = pagos.some(pago => pago.FechaVto < new Date()); // Pagos vencidos
    const tienePagosInactivos = pagos.some(pago => {
      const fechaVto = new Date(pago.FechaVto); 
      const diferenciaMeses = (fechaActual.getFullYear() - fechaVto.getFullYear()) * 12 
                        + fechaActual.getMonth() - fechaVto.getMonth();
      return diferenciaMeses > 3; // Más de 3 meses vencido
    });

    // Revisar si existe un pago reciente que lo actualice a "Al día"
    const tienePagoReciente = pagos.some(pago => {
      const fechaPago = new Date(pago.FechaPago);
      return fechaPago >= new Date(fechaActual.setHours(0, 0, 0, 0)); // Pago realizado hoy
    });

    if (tienePagoReciente) {
      return 'Al día'; // Si existe un pago reciente
    }

    if (tienePagosInactivos) {
      return 'Inactivo'; // Si tiene pagos vencidos mayores a 3 meses
    } else if (tienePagosPendientes) {
      return 'Mora'; // Si tiene pagos pendientes de vencer
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

  async obtenerPagosHoy(): Promise<Pagos[]> {
    const today = new Date();
    const startOfDay = new Date(today.setHours(0, 0, 0, 0));
    const endOfDay = new Date(today.setHours(23, 59, 59, 999));
  
    return this.pagoRepo.find({
      where: {
        FechaPago: Between(startOfDay, endOfDay), // Filtra pagos realizados hoy
      },
    });
  }
  
  async eliminarPago(idPago: number): Promise<string> {
    // Verificar si el pago existe por el ID
    const pago = await this.pagoRepo.findOne({
      where: { IdPago: idPago }, // Buscar el pago por su ID
    });
  
    if (!pago) {
      throw new Error('Pago no encontrado');
    }
  
    // Eliminar el pago
    await this.pagoRepo.remove(pago);
  
    // Actualiza el estado del socio después de eliminar el pago
    await this.actualizarEstadoSocio(pago.UserId);
  
    return `El pago con ID ${idPago} ha sido eliminado correctamente.`;
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
