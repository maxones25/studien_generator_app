import { IsNotEmpty, IsString } from 'class-validator';

export class UpdateFormEntityDto {
  @IsString()
  @IsNotEmpty()
  readonly name: string;
}
