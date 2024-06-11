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

  @Get(':id')
  async findOne(@Param('id') id: ParseIntPipe) {
    return this.userService.findOne(+id);             // el + en el id lo convierte de string a numero
  }

  @Patch(':id')  // ParseIntPipe esta bien? o se contradice con lo que hay en updateUserDto?
  update(@Param('id') id: ParseIntPipe, @Body() updateUserDto: UpdateUserDto) {      //los pipes son utilizados para transformar y validar los datos que entran a tu aplicación.
    return this.userService.update(+id, updateUserDto);                              //ParseIntPipe, se utiliza para convertir un parámetro de cadena en un número entero. 
  }

  @Put(':id')
  async updateUser(
    @Param('id') id: number,                                  //Porque aca me deja solo tipo 'number'
    @Body() updateUserDto: UpdateUserDto,
  ) {
    return this.userService.update(id, updateUserDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {                          //Y aca puedo usar 'string' o 'numbrer'
    return this.userService.remove(+id);
  }
}
