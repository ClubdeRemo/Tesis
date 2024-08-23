import { Injectable } from '@nestjs/common';
import { CreateBoteDto } from './dto/create-bote.dto';
import { UpdateBoteDto } from './dto/update-bote.dto';

@Injectable()
export class BotesService {
  create(createBoteDto: CreateBoteDto) {
    return 'This action adds a new bote';
  }

  findAll() {
    return `This action returns all botes`;
  }

  findOne(id: number) {
    return `This action returns a #${id} bote`;
  }

  update(id: number, updateBoteDto: UpdateBoteDto) {
    return `This action updates a #${id} bote`;
  }

  remove(id: number) {
    return `This action removes a #${id} bote`;
  }
}
