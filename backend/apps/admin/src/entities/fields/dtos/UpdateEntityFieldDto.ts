import { PartialType } from '@nestjs/mapped-types';
import { CreateEntityFieldDto } from './CreateEntityFieldDto';

export class UpdateEntityFieldDto extends PartialType(CreateEntityFieldDto) {}
