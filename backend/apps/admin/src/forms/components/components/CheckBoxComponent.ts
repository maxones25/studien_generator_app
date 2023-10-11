import { FieldType } from '@shared/enums/field-type.enum';
import { Component } from '../Component';
import { ComponentType } from '../component-type.enum';
import { DefaultValueAttribute } from './attributes/DefaultValueAttribute';
import { RequiredAttribute } from './attributes/RequiredAttribute';
import { LabelAttribute } from './attributes/LabelAttribute';

export class CheckBoxComponent extends Component {
  constructor() {
    super(
      ComponentType.CheckBox,
      [FieldType.Boolean],
      [
        new RequiredAttribute(true),
        new LabelAttribute(false),
        new DefaultValueAttribute(
          false,
          'boolean',
          (value) => typeof value === 'boolean',
        ),
      ],
    );
  }

  protected validateAttributes() {}
}
