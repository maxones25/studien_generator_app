import {
  IsObject,
} from 'class-validator';

export class UpdateComponentDto {
  @IsObject()
  attributes: Record<string, any>;
}