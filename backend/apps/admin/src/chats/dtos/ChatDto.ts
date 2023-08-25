import { IsNumber, IsOptional, IsUUID } from "class-validator"

export class ChatDto {
  @IsUUID()
  id: string;

  @IsUUID()
  participantId: string;

  @IsOptional()
  @IsNumber()
  unread?: number;
}