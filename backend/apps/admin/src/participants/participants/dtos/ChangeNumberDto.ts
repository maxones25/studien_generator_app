import { IsNotEmpty, IsString } from 'class-validator';

export class ChangeNumberDto {
  @IsString()
  @IsNotEmpty()
  readonly number: string;
}
