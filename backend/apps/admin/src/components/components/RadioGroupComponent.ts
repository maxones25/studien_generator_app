import { FieldType } from '@shared/enums/field-type.enum';
import { Component } from '../Component';
import { ComponentType } from '../component-type.enum';
import { LabelAttribute } from './attributes/LabelAttribute';
import { DefaultValueAttribute } from './attributes/DefaultValueAttribute';
import { OptionsAttribute } from './attributes/OptionsAttribute';

export class RadioGroupComponent extends Component {
  constructor() {
    super(
      ComponentType.RadioGroup,
      [FieldType.Text],
      [
        new LabelAttribute(false),
        new DefaultValueAttribute(
          false,
          'string',
          (value) => typeof value === 'string',
        ),
        new OptionsAttribute(true),
      ],
    );
  }

  protected validateAttributes(attributes) {}
}
