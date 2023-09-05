import { FieldType } from '@shared/enums/field-type.enum';
import { Component } from '../Component';
import { ComponentType } from '../component-type.enum';
import { LabelAttribute } from './attributes/LabelAttribute';
import { DefaultValueAttribute } from './attributes/DefaultValueAttribute';
import datetime from '@shared/modules/datetime/datetime';
import { RequiredAttribute } from './attributes/RequiredAttribute';

export class TimePickerComponent extends Component {
  constructor() {
    super(
      ComponentType.TimePicker,
      [FieldType.Time],
      [
        new RequiredAttribute(true),
        new LabelAttribute(false),
        new DefaultValueAttribute(
          false,
          'time',
          (value) => Boolean(value) && datetime.isValid(value, 'HH:mm'),
        ),
      ],
    );
  }

  protected validateAttributes(attributes) {}
}
