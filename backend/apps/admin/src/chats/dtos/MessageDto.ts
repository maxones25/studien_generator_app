import { Type } from "class-transformer";
import { IsDate, IsNotEmpty, IsOptional, IsString, IsUUID } from "class-validator"

export class MessageDto {
  @IsUUID()
  id: string;

  @IsOptional()
  @IsString()
  @IsNotEmpty()
  participantNumber?: string;

  @IsOptional()
  @IsUUID()
  directorId?: string;

  @IsOptional()
  @IsString()
  @IsNotEmpty()
  directorName?: string;

  @Type(() => Date)
  @IsDate()
  sentAt: Date;

  @IsString()
  @IsNotEmpty()
  content: string;
}