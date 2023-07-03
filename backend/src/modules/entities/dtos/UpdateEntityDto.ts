import { PartialType } from '@nestjs/mapped-types';
import { CreateEntityDto } from './CreateEntityDto';

export class UpdateEntityDto extends PartialType(CreateEntityDto) {}
