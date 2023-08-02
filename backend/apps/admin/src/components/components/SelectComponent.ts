import { FieldType } from '@shared/enums/field-type.enum';
import { Component } from '../Component';
import { ComponentType } from '../component-type.enum';
import { LabelAttribute } from './attributes/LabelAttribute';
import { DefaultValueAttribute } from './attributes/DefaultValueAttribute';

export class SelectComponent extends Component {
  constructor() {
    super(
      ComponentType.Select,
      [FieldType.Enum],
      [
        new LabelAttribute(false),
        new DefaultValueAttribute(false, (value) => typeof value === 'string'),
      ],
    );
  }

  protected validateAttributes(attributes) {}
}
