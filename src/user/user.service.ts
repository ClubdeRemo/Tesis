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
  private UserRepository: Repository<User>

  public async create(createUserDto: CreateUserDto) {
    const saltRounds = 2;
    try {
      const hashedPassword = await bcrypt.hash(createUserDto.password, saltRounds);
      var NewDto : CreateUserDto;
      NewDto = {
        username: createUserDto.username,
        password : hashedPassword
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

  async ComparePassword(password: string, hashedPassword: string): Promise <boolean> {   // Usaremos esta funcion para comparar contraseña con la hasheada, pero no es necesaria
    return await bcrypt.compare(password, hashedPassword);
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

  public async findOne(id: number) {
    var registros: any
    try{
      registros = await this.UserRepository.findOne({where: {id:id}});    //where va entre llaves porque findOne espera un objeto como argumento, y where es una clave dentro de ese objeto que define la condición de búsqueda.
      return registros ;
    }
    catch(error){
      return new BadRequestException(error);
    }
  }

  public async findByUsername(username:string){
    var registros: any
    try{
      registros = await this.UserRepository.findOne({where: {username:username}});
      return registros;
    }
    catch(error){
      return new BadRequestException(error);
    }
  }

  async validatePassword(user: User, password: string): Promise<boolean> {
    return await bcrypt.compare(password, user.password); // Compara la contraseña ingresada con la contraseña almacenada en hash en la base de datos
  }

  async update(id: number, updateUserDto: UpdateUserDto) {
    try {
      await this.UserRepository.createQueryBuilder()
      .update(User)
      .set({username:updateUserDto.username,
            password: updateUserDto.password
      })
      .where("id = :id", { id : id})
      .execute();
      return{
        statusCode:200,
        msg: 'Se realizó la modificación con exito'
      }
    }
    catch(error){
      return new BadRequestException(error);
    }
  }

  async remove(id: number) {
    try { 
      await this.UserRepository.delete(id);
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
