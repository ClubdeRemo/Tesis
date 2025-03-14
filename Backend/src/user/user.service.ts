import { BadRequestException, Injectable } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from './entities/user.entity';
import { Repository } from 'typeorm';
import * as bcrypt from 'bcrypt';
import { promises } from 'dns';

@Injectable()
export class UserService {

  @InjectRepository(User) //Inyectamos la entidad de usuario
  private UserRepository: Repository<User> //TypeORM utiliza repositorios para interactuar con la base de datos

  public async create(createUserDto: CreateUserDto) {
    const saltRounds = 10;
    try {
      const hashedPassword = await bcrypt.hash(createUserDto.Contraseña, saltRounds);
      var NewDto : CreateUserDto;
      NewDto = {
        Nombre: createUserDto.Nombre,
        Apellido: createUserDto.Apellido,
        Email: createUserDto.Email,
        Contraseña: hashedPassword,
        FechaDeNacimiento: createUserDto.FechaDeNacimiento,
        Dni: createUserDto.Dni,
        Categorias: createUserDto.Categorias,
        EstadoSocio: createUserDto.EstadoSocio
      }

    await this.UserRepository.save(NewDto);
    return { 
      statusCode: 200,
      msg: 'Usuario creado con exito'
    }

    }
    catch (error){
      return new BadRequestException(error);
    }
  }

  async ComparePassword(Contraseña: string, hashedPassword: string): Promise <boolean> {   // Usaremos esta funcion para comparar contraseña con la hasheada, pero no es necesaria
    return await bcrypt.compare(Contraseña, hashedPassword);
  }

  public async findAll() {
    var registros: any
    try{
      registros = await this.UserRepository.find();
      return registros ;
    }
    catch(error){
      return new BadRequestException(error);
    }
  }

  public async findOne(Id: number) {
    var registros: any
    try{
      registros = await this.UserRepository.findOne({where: {Id:Id}});    //where va entre llaves porque findOne espera un objeto como argumento, y where es una clave dentro de ese objeto que define la condición de búsqueda.
      return registros ;
    }
    catch(error){
      return new BadRequestException(error);
    }
  }
  public async findOneByDni(Dni: number) {
    var registros: any
    try{
      registros = await this.UserRepository.findOne({where: {Dni:Dni}});    //where va entre llaves porque findOne espera un objeto como argumento, y where es una clave dentro de ese objeto que define la condición de búsqueda.
      return registros ;
    }
    catch(error){
      return new BadRequestException(error);
    }
  }

  public async findByUsername(Nombre:string){
    var registros: any
    try{
      registros = await this.UserRepository.findOne({where: {Nombre:Nombre}});
      return registros;
    }
    catch(error){
      return new BadRequestException(error);
    }
  }

  async validatePassword(user: User, Contraseña: string): Promise<boolean> {
    return await bcrypt.compare(Contraseña, user.Contraseña); // Compara la contraseña ingresada con la contraseña almacenada en hash en la base de datos
  }

  async update(Id: number, updateUserDto: UpdateUserDto) {
    const saltRounds = 10;
    try {
      // Solo hashear la contraseña si se proporciona una nueva contraseña
      let hashedPassword = updateUserDto.Contraseña;
      if (updateUserDto.Contraseña) {
        hashedPassword = await bcrypt.hash(updateUserDto.Contraseña, saltRounds);
      }
  
      await this.UserRepository.createQueryBuilder()
        .update(User)
        .set({
          Nombre: updateUserDto.Nombre,
          Apellido: updateUserDto.Apellido,
          Email: updateUserDto.Email,
          FechaDeNacimiento: updateUserDto.FechaDeNacimiento,
          Dni: updateUserDto.Dni,
          // Si no se proporciona una nueva contraseña, no se actualiza
          ...(hashedPassword && { Contraseña: hashedPassword }),
          Categorias: updateUserDto.Categorias,
          EstadoSocio: updateUserDto.EstadoSocio,
        })
        .where("Id = :Id", { Id: Id })
        .execute();
  
      return {
        statusCode: 200,
        msg: 'Se realizó la modificación con éxito'
      };
    } catch (error) {
      return new BadRequestException(error);
    }
  }
  

  async remove(Id: number) {
    try { 
      await this.UserRepository.delete(Id);
      return{
        statusCode: 200,
        msg: 'Se eliminó correctamente'
      }
    }
    catch(error){
      return new BadRequestException(error);
    }
  }
}
