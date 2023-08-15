import { IsUUID } from 'class-validator';

export class ScheduleParamsDto {
  @IsUUID()
  studyId: string;

  @IsUUID()
  scheduleId: string;
}
