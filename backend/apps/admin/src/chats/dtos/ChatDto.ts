import { ChatMessageReceipt } from "@entities";
import { IsArray, IsNumber, IsOptional, IsUUID } from "class-validator"

export class ChatDto {
  @IsUUID()
  id: string;

  @IsUUID()
  participantId: string;

  @IsOptional()
  @IsNumber()
  read?: number;
}