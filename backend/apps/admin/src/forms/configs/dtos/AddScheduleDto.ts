import {
  ArrayMaxSize,
  ArrayMinSize,
  IsArray,
  IsBoolean,
  IsEnum,
  IsInt,
  IsNotEmpty,
  IsObject,
  Matches,
  Max,
  Min,
  ValidateIf,
  ValidateNested,
} from 'class-validator';
import { FormScheduleType } from '../enums/FormScheduleType';
import { FormSchedulePeriod } from '../enums/FormSchedulePeriod';
import { Type } from 'class-transformer';
import { DaysOfMonth, DaysOfWeek } from '@entities';
import { PostponeDto } from './PostponeDto';
import { RestrictDto } from './RestrictDto';

export class AddScheduleDto {
  @IsEnum(FormScheduleType)
  readonly type: FormScheduleType;

  @IsEnum(FormSchedulePeriod)
  readonly period: FormSchedulePeriod;

  @IsObject()
  @ValidateNested()
  @Type(() => PostponeDto)
  @ValidateIf(({ postpone }) => postpone !== null)
  readonly postpone: PostponeDto | null;

  @IsObject()
  @ValidateNested()
  @Type(() => RestrictDto)
  @ValidateIf(({ restrict }) => restrict !== null)
  readonly restrict: RestrictDto | null;

  @IsArray()
  @ArrayMinSize(1)
  @IsNotEmpty({ each: true })
  @Matches(/^([0-1]?[0-9]|2[0-3]):[0-5][0-9]$/, {
    each: true,
    message: 'Invalid time format. Expected HH:mm',
  })
  readonly times: string[];

  @ValidateIf(({ type }) => type === FormScheduleType.Fix)
  @IsInt()
  @Min(1)
  readonly frequency: number;

  @ValidateIf(
    ({ type, period }) =>
      type === FormScheduleType.Fix && period === FormSchedulePeriod.Week,
  )
  @IsArray()
  @ArrayMinSize(7)
  @ArrayMaxSize(7)
  @IsBoolean({ each: true })
  readonly daysOfWeek: DaysOfWeek;

  @ValidateIf(
    ({ type, period }) =>
      type === FormScheduleType.Fix && period === FormSchedulePeriod.Month,
  )
  @IsArray()
  @ArrayMinSize(1)
  @IsInt({ each: true })
  @Min(1, { each: true })
  @Max(28, { each: true })
  readonly daysOfMonth: DaysOfMonth;

  @ValidateIf(({ type }) => type === FormScheduleType.Flexible)
  @IsInt()
  @Min(1)
  readonly amount: number;
}
