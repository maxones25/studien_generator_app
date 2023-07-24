import { IsNotEmpty, IsString } from 'class-validator';

export class CreateFormDto {
  @IsString()
  @IsNotEmpty()
  readonly name: string;
}
