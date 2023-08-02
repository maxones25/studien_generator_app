import { FieldType } from '@shared/enums/field-type.enum';
import { Component } from '../Component';
import { ComponentType } from '../component-type.enum';
import { LabelAttribute } from './attributes/LabelAttribute';
import { DefaultValueAttribute } from './attributes/DefaultValueAttribute';
import datetime from '@shared/modules/datetime/datetime';

export class TimePickerComponent extends Component {
  constructor() {
    super(
      ComponentType.TimePicker,
      [FieldType.Time],
      [
        new LabelAttribute(false),
        new DefaultValueAttribute(false, "time", (value) =>
          datetime.isValid(value, 'HH:mm:ss'),
        ),
      ],
    );
  }

  protected validateAttributes(attributes) {}
}
