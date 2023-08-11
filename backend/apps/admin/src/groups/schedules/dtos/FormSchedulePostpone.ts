import { IsBoolean, IsInt, Min } from 'class-validator';

export class FormSchedulePostpone {
  @IsBoolean()
  isActive: boolean;

  @IsInt()
  @Min(0)
  times: number;

  @IsInt()
  @Min(0)
  duration: number;
}
