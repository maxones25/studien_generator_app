import { FieldType } from '@shared/enums/field-type.enum';
import { Component } from '../Component';
import { ComponentType } from '../component-type.enum';
import { MinAttribute } from './attributes/MinAttribute';
import { MaxAttribute } from './attributes/MaxAttribute';
import { DefaultValueAttribute } from './attributes/DefaultValueAttribute';
import { LabelAttribute } from './attributes/LabelAttribute';
import { BadRequestException } from '@nestjs/common';
import { TextAttribute } from './attributes/TextAttribute';
import { RequiredAttribute } from './attributes/RequiredAttribute';

export class SliderComponent extends Component {
  constructor() {
    super(
      ComponentType.Slider,
      [FieldType.Number],
      [
        new RequiredAttribute(true),
        new LabelAttribute(false),
        new MinAttribute(true),
        new TextAttribute('minLabel', false),
        new MaxAttribute(true),
        new TextAttribute('maxLabel', false),
        new DefaultValueAttribute(
          false,
          'number',
          (value) => typeof value === 'number',
        ),
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
