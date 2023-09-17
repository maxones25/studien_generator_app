import { Transform } from 'class-transformer';
import { IsDate } from 'class-validator';

export class ReadMessagesDto {
  @IsDate()
  @Transform(({ value }) => {
    return new Date(value);
  })
  readonly readAt: Date;
}
