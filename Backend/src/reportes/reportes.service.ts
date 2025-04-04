import { BadRequestException, Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Mensajes } from './reportes.entity';
import { Repository } from 'typeorm';
import { MensajeDto } from './reportes.dto';


@Injectable()
export class ReportesService {
    @InjectRepository(Mensajes) //Inyectamos la entidad de usuario
    private MensajeRepository: Repository<Mensajes> 

    public async create(MensajeDto: MensajeDto) {
        try {
            var NewDto : MensajeDto;
            NewDto = {
            Mensaje: MensajeDto.Mensaje,
            Fecha: MensajeDto.Fecha
        }
    
        await this.MensajeRepository.save(NewDto);
        return { 
            statusCode: 200,
            msg: 'Mensaje enviado'
        }

        }
        catch (error){
            return new BadRequestException(error);
        }
    }

    public async findAll() {
        var registros: any
        try{
            registros = await this.MensajeRepository.find({
                order: {
                  Fecha: 'DESC', // Ordena por la fecha más reciente
                },
            });
            return registros ;
        }
        catch(error){
            return new BadRequestException(error);
        }
    }

    async eliminarMensaje(IdMensaje: string): Promise<void> {
        await this.MensajeRepository.delete(IdMensaje); 
    }      

     // Obtener mensaje por ID
     async obtenerMensajePorId(IdMensaje: number): Promise<Mensajes | null> {
        try {
          return await this.MensajeRepository.findOne({ where: { IdMensaje } }); // Usamos 'where' para buscar por el ID
        } catch (error) {
          console.error('Error al obtener mensaje:', error);
          throw new Error('Mensaje no encontrado');
        }
      }
    
      // Modificar mensaje
      async modificarMensaje(IdMensaje: number, nuevoMensaje: string): Promise<Mensajes> {
        const mensaje = await this.MensajeRepository.findOne({ where: { IdMensaje } });
        if (!mensaje) {
          throw new Error('Mensaje no encontrado');
        }
    mensaje.Mensaje = nuevoMensaje;
    return await this.MensajeRepository.save(mensaje);
}
}