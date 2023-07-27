import { IsNotEmpty, IsString, IsUUID } from 'class-validator';

export class CreateFormEntityDto {
  @IsUUID()
  @IsNotEmpty()
  readonly entityId: string;

  @IsString()
  @IsNotEmpty()
  readonly name: string;
}
