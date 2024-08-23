import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { BotesService } from './botes.service';
import { CreateBoteDto } from './dto/create-bote.dto';
import { UpdateBoteDto } from './dto/update-bote.dto';

@Controller('botes')
export class BotesController {
  constructor(private readonly botesService: BotesService) {}

  @Post()
  create(@Body() createBoteDto: CreateBoteDto) {
    return this.botesService.create(createBoteDto);
  }

  @Get()
  findAll() {
    return this.botesService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.botesService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateBoteDto: UpdateBoteDto) {
    return this.botesService.update(+id, updateBoteDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.botesService.remove(+id);
  }
}
