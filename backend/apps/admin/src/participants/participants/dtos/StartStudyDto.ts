import { DaysOfMonth, DaysOfWeek } from '@entities/core/group';
import { Transform, Type } from 'class-transformer';
import {
  ArrayMaxSize,
  ArrayMinSize,
  IsArray,
  IsBoolean,
  IsDate,
  IsInt,
  IsObject,
  IsOptional,
  IsUUID,
  Matches,
  Max,
  Min,
  ValidateNested,
} from 'class-validator';

export class StartStudySchedule {
  @IsUUID()
  readonly id: string;

  @IsArray()
  @Matches(/^([0-1]?[0-9]|2[0-3]):[0-5][0-9]$/, {
    each: true,
    message: 'Invalid time format. Expected HH:mm',
  })
  readonly times: string[];

  @IsOptional()
  @IsArray()
  @ArrayMinSize(7)
  @ArrayMaxSize(7)
  @IsBoolean({ each: true })
  readonly daysOfWeek: DaysOfWeek;

  @IsOptional()
  @IsArray()
  @ArrayMinSize(1)
  @IsInt({ each: true })
  @Min(1, { each: true })
  @Max(28, { each: true })
  readonly daysOfMonth: DaysOfMonth;
}

export class StartStudyConfig {
  @IsUUID()
  readonly id: string;

  @IsArray()
  @IsObject({ each: true })
  @ValidateNested({ each: true })
  @Type(() => StartStudySchedule)
  readonly schedules: StartStudySchedule[];
}

export class StartStudyDto {
  @IsDate()
  @Transform(({ value }) => {
    return new Date(value);
  })
  readonly startDate: Date;

  @IsArray()
  @IsObject({ each: true })
  @ValidateNested({ each: true })
  @Type(() => StartStudyConfig)
  readonly configs: StartStudyConfig[];
}
