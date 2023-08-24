import { PartialType } from '@nestjs/mapped-types';
import { CreateFieldDto } from './CreateFieldDto';

export class UpdateFieldDto extends PartialType(CreateFieldDto) {}
