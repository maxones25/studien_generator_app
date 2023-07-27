import { PartialType } from '@nestjs/mapped-types';
import { CreateFormConfigurationDto } from './CreateFormConfigurationDto';

export class UpdateFormConfigurationDto extends PartialType(CreateFormConfigurationDto){}
