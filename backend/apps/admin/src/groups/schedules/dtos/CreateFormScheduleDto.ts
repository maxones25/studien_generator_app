import {
  ArrayMaxSize,
  ArrayMinSize,
  IsArray,
  IsBoolean,
  IsDateString,
  IsEnum,
  IsISO8601,
  IsInt,
  IsNotEmpty,
  IsObject,
  IsUUID,
  Matches,
  Max,
  Min,
  ValidateIf,
  ValidateNested,
} from 'class-validator';
import { FormScheduleType } from '../enums/FormScheduleType';
import { FormSchedulePeriod } from '../enums/FormSchedulePeriod';
import { FormSchedulePostpone } from './FormSchedulePostpone';
import { Type } from 'class-transformer';

export class CreateFormScheduleDto {
  @IsUUID()
  readonly configId: string;

  @IsEnum(FormScheduleType)
  readonly type: FormScheduleType;

  @IsEnum(FormSchedulePeriod)
  readonly period: FormSchedulePeriod;

  @IsInt()
  @Min(1)
  readonly frequency: number;

  @IsObject()
  @ValidateNested()
  @Type(() => FormSchedulePostpone)
  readonly postpone: FormSchedulePostpone;

  @IsArray()
  @ArrayMinSize(1)
  @IsNotEmpty({ each: true })
  @Matches(/^([0-1]?[0-9]|2[0-3]):[0-5][0-9]$/, {
    each: true,
    message: 'Invalid time format. Expected HH:mm',
  })
  readonly times: string[];

  @ValidateIf(
    ({ type, period }) =>
      type === FormScheduleType.Fix && period === FormSchedulePeriod.Week,
  )
  @IsArray()
  @ArrayMinSize(7)
  @ArrayMaxSize(7)
  @IsBoolean({ each: true })
  readonly daysOfWeek?: boolean[];

  @ValidateIf(
    ({ type, period }) =>
      type === FormScheduleType.Fix && period === FormSchedulePeriod.Month,
  )
  @IsArray()
  @ArrayMinSize(1)
  @IsInt({ each: true })
  @Min(1, { each: true })
  @Max(28, { each: true })
  readonly dayOfMonth?: number[];

  @ValidateIf(
    ({ type, period }) =>
      type === FormScheduleType.Flexible && period === FormSchedulePeriod.Week,
  )
  @IsInt()
  @Min(1)
  readonly days?: number;
}
