import {
  ValidatorConstraint,
  ValidatorConstraintInterface,
  ValidationArguments,
  ValidationError,
  ValidationOptions,
  registerDecorator,
} from 'class-validator';
import { FormScheduleType } from '../enums/FormScheduleType';
import { FormSchedulePeriod } from '../enums/FormSchedulePeriod';

@ValidatorConstraint({ async: true })
export class CustomScheduleValidator implements ValidatorConstraintInterface {
  validate(data: any, args: ValidationArguments) {
    const relatedProperties = args.constraints[0];

    const [type, period, frequency]: [
      type: FormScheduleType,
      period: FormSchedulePeriod,
      frequency: number,
    ] = relatedProperties.map((prop: string) => (args.object as any)[prop]);

    if (
      type === FormScheduleType.Fix &&
      period === FormSchedulePeriod.Day &&
      typeof frequency !== 'number'
    )
      return false;

    return true;
  }

  private validateWeekDays(data: any[]): boolean {
    const weekDays = ['Mo', 'Tu', 'We', 'Th', 'Fr', 'Sa', 'So'];
    return data.every((day) => weekDays.includes(day));
  }

  private validateMonthDays(data: string): boolean {
    const [start, end] = data.split('-').map(Number);
    return start >= 1 && end <= 30;
  }

  private validateFlexibleData(data: string): boolean {
    const [count, space] = data.split(', min space: ').map(Number);
    return count >= 1 && space >= 1;
  }

  defaultMessage(args: ValidationArguments): string {
    return `Data property ${args.property} has invalid value ${args.value}`;
  }
}

export function ValidateFormSchedule(validationOptions?: ValidationOptions) {
  return function (object: any, propertyName: string) {
    registerDecorator({
      target: object.constructor,
      propertyName: propertyName,
      options: validationOptions,
      constraints: [['type', 'period', 'freq']],
      validator: CustomScheduleValidator,
    });
  };
}
