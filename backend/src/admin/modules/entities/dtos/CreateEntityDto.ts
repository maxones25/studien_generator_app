import { IsNotEmpty, IsString } from 'class-validator';

export class CreateEntityDto {
  @IsString()
  @IsNotEmpty()
  name: string;
}
