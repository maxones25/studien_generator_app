import { Type } from 'class-transformer';
import { IsDate, IsNotEmpty, IsString, IsUUID } from 'class-validator';

export class AddMessageDto {
  @IsUUID()
  readonly id: string;

  @IsUUID()
  readonly participantId: string;
  
  @IsUUID()
  readonly chatId: string;

  @Type(() => Date)
  @IsDate()
  readonly sentAt: Date;

  @IsString()
  @IsNotEmpty()
  readonly content: string;
}
