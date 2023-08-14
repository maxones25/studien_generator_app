import {
  ArrayMaxSize,
  ArrayMinSize,
  IsArray,
  IsBoolean,
  IsEnum,
  IsInt,
  IsObject,
  IsUUID,
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

  @ValidateIf(
    ({ type, period }) =>
      type === FormScheduleType.Fix && period === FormSchedulePeriod.Week,
  )
  @IsArray()
  @ArrayMinSize(7)
  @ArrayMaxSize(7)
  @IsBoolean({ each: true })
  readonly daysOfWeek: boolean[];

  @ValidateIf(
    ({ type, period }) =>
      type === FormScheduleType.Fix && period === FormSchedulePeriod.Month,
  )
  @IsArray()
  @ArrayMinSize(1)
  @IsInt({ each: true })
  @Min(1, { each: true })
  @Max(28, { each: true })
  readonly dayOfMonth: number[];

  @ValidateIf(
    ({ type, period }) =>
      type === FormScheduleType.Flexible && period === FormSchedulePeriod.Week,
  )
  @IsInt()
  @Min(1)
  readonly days: number;

  @ValidateIf(
    ({ type, period }) =>
      (type === FormScheduleType.Flexible &&
        period === FormSchedulePeriod.Week) ||
      (type === FormScheduleType.Flexible &&
        period === FormSchedulePeriod.Month),
  )
  @IsInt()
  @Min(0)
  readonly daysInBetween: number;
}
