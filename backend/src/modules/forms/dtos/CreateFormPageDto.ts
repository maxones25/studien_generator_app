import { IsString } from 'class-validator';

export class CreateFormPageDto {
  @IsString()
  readonly title: string;
}
