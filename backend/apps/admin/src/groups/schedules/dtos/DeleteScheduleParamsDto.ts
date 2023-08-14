import { IsUUID } from 'class-validator';

export class DeleteScheduleParamsDto {
  @IsUUID()
  studyId: string;

  @IsUUID()
  scheduleId: string;
}
