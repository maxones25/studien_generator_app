import { Type } from "class-transformer";
import { IsDate, IsNotEmpty, IsOptional, IsString, IsUUID, Validate } from "class-validator"

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
  @Validate((date: Date) => date < new Date(), { 
    message: "The date must be in the past",
  })
  sentAt: Date;

  @IsOptional()

  @Type(() => Date)
  @IsDate()
  readAt?: Date;

  @IsString()
  @IsNotEmpty()
  content: string;
}