import { FieldType } from '@shared/enums/field-type.enum';
import { Component } from '../Component';
import { ComponentType } from '../component-type.enum';
import { LabelAttribute } from './attributes/LabelAttribute';
import { DefaultValueAttribute } from './attributes/DefaultValueAttribute';
import datetime from '@shared/modules/datetime/datetime';
import { RequiredAttribute } from './attributes/RequiredAttribute';

export class DateTimePickerComponent extends Component {
  constructor() {
    super(
      ComponentType.DateTimePicker,
      [FieldType.DateTime],
      [
        new RequiredAttribute(true),
        new LabelAttribute(false),
        new DefaultValueAttribute(false, 'datetime', (value) => {
          if (!Boolean(value)) return false;
          if (typeof value !== 'string') return false;
          return (
            value === 'CurrentDateTime' ||
            datetime.isValid(value as string, 'YYYY-MM-DDTHH:mm')
          );
        }),
      ],
    );
  }

  protected validateAttributes() {}
}
