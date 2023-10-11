import { FieldType } from '@shared/enums/field-type.enum';
import { Component } from '../Component';
import { ComponentType } from '../component-type.enum';
import { LabelAttribute } from './attributes/LabelAttribute';
import { DefaultValueAttribute } from './attributes/DefaultValueAttribute';
import { OptionsAttribute } from './attributes/OptionsAttribute';
import { RequiredAttribute } from './attributes/RequiredAttribute';
import { BadRequestException } from '@nestjs/common';

export class SelectComponent extends Component {
  constructor() {
    super(
      ComponentType.Select,
      [FieldType.Text],
      [
        new RequiredAttribute(true),
        new LabelAttribute(false),
        new OptionsAttribute(true),
        new DefaultValueAttribute(
          false,
          'string',
          (value) => typeof value === 'string',
        ),
      ],
    );
  }

  protected validateAttributes({ options, defaultValue }) {
    if (defaultValue && !options.includes(defaultValue))
      throw new BadRequestException('defaultValue must be an option');
  }
}
