import { Type } from 'class-transformer';
import { IsDate } from 'class-validator';

export class ReadNotificationsDto {
  @Type(() => Date)
  @IsDate()
  readAt: Date;
}
