import { FieldType } from '@shared/enums/field-type.enum';
import { Component } from '../Component';
import { ComponentType } from '../component-type.enum';
import { LabelAttribute } from './attributes/LabelAttribute';
import { DefaultValueAttribute } from './attributes/DefaultValueAttribute';
import { RequiredAttribute } from './attributes/RequiredAttribute';

export class TextFieldComponent extends Component {
  constructor() {
    super(
      ComponentType.TextField,
      [FieldType.Text],
      [
        new LabelAttribute(false),
        new RequiredAttribute(true),
        new DefaultValueAttribute(
          false,
          'string',
          (value) => typeof value === 'string',
        ),
      ],
    );
  }

  protected validateAttributes(attributes) {}
}
