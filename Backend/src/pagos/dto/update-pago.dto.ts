import { PartialType } from '@nestjs/mapped-types';
import { CreatePagosDto } from './create-pago.dto';

export class UpdatePagosDto extends PartialType(CreatePagosDto) {}
