import { PartialType } from '@nestjs/mapped-types';
import { CreateBoteDto } from './create-bote.dto';

export class UpdateBoteDto extends PartialType(CreateBoteDto) {}
