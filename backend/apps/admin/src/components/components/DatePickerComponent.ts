import { FieldType } from '@shared/enums/field-type.enum';
import { Component } from '../Component';
import { ComponentType } from '../component-type.enum';
import { LabelAttribute } from './attributes/LabelAttribute';
import { DefaultValueAttribute } from './attributes/DefaultValueAttribute';
import datetime from '@shared/modules/datetime/datetime';
import { RequiredAttribute } from './attributes/RequiredAttribute';

export class DatePickerComponent extends Component {
  constructor() {
    super(
      ComponentType.DatePicker,
      [FieldType.Date],
      [
        new RequiredAttribute(true),
        new LabelAttribute(false),
        new DefaultValueAttribute(false, 'date', (value) => {
          if (!Boolean(value)) return false;
          if(typeof value !== "string") return false;
          
          return (
            value === 'CurrentDate' || datetime.isValid(value, 'YYYY-MM-DD')
          );
        }),
      ],
    );
  }

  protected validateAttributes() {}
}
