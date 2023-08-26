import { Type } from 'class-transformer';
import { IsDate, IsNotEmpty, IsString, IsUUID, Validate } from 'class-validator';

export class AddMessageDto {
  @Type(() => Date)
  @IsDate()
  @Validate((date: Date) => date < new Date(), { 
    message: "The date must be in the past",
  })
  readonly sentAt: Date;

  @IsString()
  @IsNotEmpty()
  readonly content: string;
}
