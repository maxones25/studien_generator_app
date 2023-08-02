import { FieldType } from '@shared/enums/field-type.enum';
import { Component } from '../Component';
import { ComponentType } from '../component-type.enum';
import { LabelAttribute } from './attributes/LabelAttribute';
import { DefaultValueAttribute } from './attributes/DefaultValueAttribute';

export class TextFieldComponent extends Component {
  constructor() {
    super(
      ComponentType.TextField,
      [FieldType.Text],
      [
        new LabelAttribute(false),
        new DefaultValueAttribute(false, (value) => typeof value === 'string'),
      ],
    );
  }

  protected validateAttributes(attributes) {}
}
