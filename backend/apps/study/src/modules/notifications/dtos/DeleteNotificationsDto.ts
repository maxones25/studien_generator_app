import { Type } from 'class-transformer';
import { IsDate, IsOptional } from 'class-validator';

export class DeleteNotificationsDto {
  @IsOptional()
  @Type(() => Date)
  @IsDate()
  lastUpdated?: Date;
}
