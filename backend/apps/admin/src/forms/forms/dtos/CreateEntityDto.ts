import { IsNotEmpty, IsString, IsUUID } from 'class-validator';

export class CreateEntityDto {
  @IsString()
  @IsNotEmpty()
  readonly name: string;
}
