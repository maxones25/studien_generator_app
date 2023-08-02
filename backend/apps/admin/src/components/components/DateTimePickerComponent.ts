import { FieldType } from '@shared/enums/field-type.enum';
import { Component } from '../Component';
import { ComponentType } from '../component-type.enum';
import { LabelAttribute } from './attributes/LabelAttribute';
import { DefaultValueAttribute } from './attributes/DefaultValueAttribute';
import datetime from '@shared/modules/datetime/datetime';

export class DateTimePickerComponent extends Component {
  constructor() {
    super(
      ComponentType.DateTimePicker,
      [FieldType.DateTime],
      [
        new LabelAttribute(false),
        new DefaultValueAttribute(false, "datetime", (value) =>
          datetime.isValid(value as string, 'YYYY-MM-DDTHH:mm:ss'),
        ),
      ],
    );
  }

  protected validateAttributes() {}
}
