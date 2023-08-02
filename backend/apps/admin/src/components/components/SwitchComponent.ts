import { FieldType } from '@shared/enums/field-type.enum';
import { Component } from '../Component';
import { ComponentType } from '../component-type.enum';
import { LabelAttribute } from './attributes/LabelAttribute';
import { DefaultValueAttribute } from './attributes/DefaultValueAttribute';

export class SwitchComponent extends Component {
  constructor() {
    super(
      ComponentType.Switch,
      [FieldType.Boolean],
      [
        new LabelAttribute(false),
        new DefaultValueAttribute(false, "boolean", (value) => typeof value === 'boolean'),
      ],
    );
  }

  protected validateAttributes(attributes) {}
}
