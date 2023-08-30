import { FieldType } from '@shared/enums/field-type.enum';
import { Component } from '../Component';
import { ComponentType } from '../component-type.enum';
import { LabelAttribute } from './attributes/LabelAttribute';
import { DefaultValueAttribute } from './attributes/DefaultValueAttribute';
import { OptionsAttribute } from './attributes/OptionsAttribute';

export class SelectComponent extends Component {
  constructor() {
    super(
      ComponentType.Select,
      [FieldType.Text],
      [
        new LabelAttribute(false),
        new OptionsAttribute(true),
        new DefaultValueAttribute(false, "string", (value) => typeof value === 'string'),
      ],
    );
  }

  protected validateAttributes(attributes) {}
}
