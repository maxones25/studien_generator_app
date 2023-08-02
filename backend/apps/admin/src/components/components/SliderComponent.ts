import { FieldType } from '@shared/enums/field-type.enum';
import { Component } from '../Component';
import { ComponentType } from '../component-type.enum';
import { MinAttribute } from './attributes/MinAttribute';
import { MaxAttribute } from './attributes/MaxAttribute';
import { DefaultValueAttribute } from './attributes/DefaultValueAttribute';
import { LabelAttribute } from './attributes/LabelAttribute';
import { BadRequestException } from '@nestjs/common';

export class SliderComponent extends Component {
  constructor() {
    super(
      ComponentType.Slider,
      [FieldType.Number],
      [
        new LabelAttribute(false),
        new MinAttribute(true),
        new MaxAttribute(true),
        new DefaultValueAttribute(false, (value) => typeof value === 'number'),
      ],
    );
  }

  protected validateAttributes({ min, max, defaultValue }) {
    if (min >= max)
      throw new BadRequestException(`attribute min must be smaller than max`);

    if (
      typeof defaultValue === 'number' &&
      (defaultValue < min || defaultValue > max)
    )
      throw new BadRequestException(
        `default must be between min and max, default=${defaultValue}, min=${min}, max=${max}`,
      );
  }
}
