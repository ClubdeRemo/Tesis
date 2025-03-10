import { Controller, Get, Post, Body, Patch, Param, Delete, Put, ParseIntPipe } from '@nestjs/common';
import { UserService } from './user.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';

@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Post()
  async create(@Body() createUserDto: CreateUserDto) {
    return this.userService.create(createUserDto);
  }

  @Get()
  async findAll() {
    return this.userService.findAll();
  }

  @Get(':Id')
  async findOne(@Param('Id') Id: ParseIntPipe) {
    return this.userService.findOne(+Id);             // el + en el id lo convierte de string a numero
  }

  @Get('dni/:dni')
  async findOneDni(@Param('dni') dni: string) {
    return this.userService.findOneByDni(+dni); 
  }
  

  @Patch(':Id')
  async update(@Param('Id') Id: ParseIntPipe, @Body() updateUserDto: UpdateUserDto) {      //los pipes son utilizados para transformar y validar los datos que entran a tu aplicación.
    return this.userService.update(+Id, updateUserDto);                              //ParseIntPipe, se utiliza para convertir un parámetro de cadena en un número entero. 
  }

  @Put('modificar/:Id')
  async updateUser(
    @Param('Id') Id: number,    
    @Body() updateUserDto: UpdateUserDto,
  ) {
    return this.userService.update(Id, updateUserDto);
  }

  @Delete('Id/:Id')
  async remove(@Param('Id') Id: string) {                       
    return this.userService.remove(+Id);
  }
}
