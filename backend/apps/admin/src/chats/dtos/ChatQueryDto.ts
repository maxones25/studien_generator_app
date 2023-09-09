import { IsUUID } from 'class-validator';

export class ChatQueryDto {
  @IsUUID()
  readonly chatId: string;
}
