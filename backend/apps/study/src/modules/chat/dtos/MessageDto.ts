import { Type } from "class-transformer";
import { IsDate, IsNotEmpty, IsOptional, IsString, IsUUID } from "class-validator"

export class MessageDto {
  @IsUUID()
  id: string;

  @IsOptional()
  @IsUUID()
  participantId?: string;

  @IsOptional()
  @IsString()
  @IsNotEmpty()
  directorName?: string;

  @Type(() => Date)
  @IsDate()
  sendAt: Date;

  @IsOptional()

  @Type(() => Date)
  @IsDate()
  readAt?: Date;

  @IsString()
  @IsNotEmpty()
  content: string;
}