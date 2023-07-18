import { IsNotEmpty, IsString, IsUUID } from 'class-validator';

export class CreateFormEntityDto {
  @IsString()
  @IsUUID()
  @IsNotEmpty()
  readonly entityId: string;
}
