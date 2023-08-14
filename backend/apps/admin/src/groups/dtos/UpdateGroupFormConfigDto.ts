import { PartialType } from '@nestjs/mapped-types';
import { CreateGroupFormConfigDto } from './CreateGroupFormConfigDto';

export class UpdateGroupFormConfigDto extends PartialType(
  CreateGroupFormConfigDto,
) {}
