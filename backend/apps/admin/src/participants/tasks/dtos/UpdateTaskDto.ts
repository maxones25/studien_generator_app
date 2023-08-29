import { Transform } from 'class-transformer';
import { IsDate, IsInt, IsOptional, Min } from 'class-validator';

export class UpdateTaskDto {
  @IsDate()
  @Transform(({ value }) => {
    return new Date(value);
  })
  readonly scheduledAt: Date;

  @IsOptional()
  @IsDate()
  @Transform(({ value }) => {
    if (!value) return null;
    return new Date(value);
  })
  readonly completedAt: Date | null;

  @IsInt()
  @Min(0)
  readonly rescheduled: number;
}
