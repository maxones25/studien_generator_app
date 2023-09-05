import { FieldType } from '@shared/enums/field-type.enum';
import { Component } from '../Component';
import { ComponentType } from '../component-type.enum';
import { LabelAttribute } from './attributes/LabelAttribute';
import { DefaultValueAttribute } from './attributes/DefaultValueAttribute';
import { MinAttribute } from './attributes/MinAttribute';
import { MaxAttribute } from './attributes/MaxAttribute';
import { BadRequestException } from '@nestjs/common';
import { RequiredAttribute } from './attributes/RequiredAttribute';

export class NumberPickerComponent extends Component {
  constructor() {
    super(
      ComponentType.NumberPicker,
      [FieldType.Number],
      [
        new RequiredAttribute(true),
        new LabelAttribute(false),
        new MinAttribute(false),
        new MaxAttribute(false),
        new DefaultValueAttribute(false, "number", (value) => typeof value === 'number'),
      ],
    );
  }

  protected validateAttributes({ min, max, defaultValue }) {
    if (min !== undefined && max !== undefined && min >= max)
      throw new BadRequestException(`attribute min must be smaller than max`);

    if (
      typeof min === 'number' &&
      typeof defaultValue === 'number' &&
      defaultValue < min
    )
      throw new BadRequestException(
        `defaultValue must be greater/equals ${min}`,
      );

    if (
      typeof max === 'number' &&
      typeof defaultValue === 'number' &&
      defaultValue > max
    )
      throw new BadRequestException(
        `defaultValue must be smaller/equals ${max}`,
      );
  }
}
