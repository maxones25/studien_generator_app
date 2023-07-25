import { PartialType } from '@nestjs/mapped-types';
import { CreateGroupDto } from './CreateGroupDto';

export class UpdateGroupDto extends PartialType(CreateGroupDto) {}
