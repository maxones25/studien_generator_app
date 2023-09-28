import { IsUUID } from 'class-validator';

export class ScheduleQueryDto {
  @IsUUID()
  scheduleId: string;
}
