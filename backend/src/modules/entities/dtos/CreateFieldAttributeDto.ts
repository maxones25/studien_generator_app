import { IsNotEmpty, IsString } from 'class-validator';

export class CreateFieldAttributeDto {
  @IsString()
  @IsNotEmpty()
  key: string;

  @IsNotEmpty()
  value: any;
}
