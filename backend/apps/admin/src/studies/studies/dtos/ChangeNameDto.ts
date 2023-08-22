import { IsString, IsNotEmpty } from 'class-validator';

export class ChangeNameDto {
  @IsString()
  @IsNotEmpty()
  readonly name: string;
}
