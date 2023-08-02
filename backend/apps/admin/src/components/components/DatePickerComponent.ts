import { FieldType } from '@shared/enums/field-type.enum';
import { Component } from '../Component';
import { ComponentType } from '../component-type.enum';
import { LabelAttribute } from './attributes/LabelAttribute';
import { DefaultValueAttribute } from './attributes/DefaultValueAttribute';
import datetime from '@shared/modules/datetime/datetime';

export class DatePickerComponent extends Component {
  constructor() {
    super(
      ComponentType.DatePicker,
      [FieldType.Date],
      [
        new LabelAttribute(false),
        new DefaultValueAttribute(false, (value) =>
          datetime.isValid(value, 'YYYY-MM-DD'),
        ),
      ],
    );
  }

  protected validateAttributes() {}
}
