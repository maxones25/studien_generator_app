import { IsArray, IsNotEmpty, IsOptional, IsString, ValidateNested } from 'class-validator';
import { CreateFormEntityDto } from '../entities/dtos/CreateFormEntityDto';
import { Type } from 'class-transformer';

export class CreateFormDto {
  @IsString()
  @IsNotEmpty()
  readonly name: string;

  @IsArray()
  @IsOptional()
  @Type(() => CreateFormEntityDto)
  @ValidateNested({ each: true })
  readonly entities?: CreateFormEntityDto[]
}
