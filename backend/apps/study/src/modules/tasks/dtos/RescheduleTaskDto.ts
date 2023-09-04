import { Type } from "class-transformer";
import { IsDate, IsUUID } from "class-validator";

export class RescheduleTaskDto {
  @IsUUID()
  id: string

  @Type(() => Date)
  @IsDate()
  date: Date;
}