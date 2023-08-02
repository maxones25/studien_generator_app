import { FieldType } from '@shared/enums/field-type.enum';
import { Component } from '../Component';
import { ComponentType } from '../component-type.enum';
import { FormComponentAttributeDto } from '@admin/forms/pages/components/attributes/dtos/FormComponentAttributeDto';
import { LabelAttribute } from './attributes/LabelAttribute';
import { DefaultValueAttribute } from './attributes/DefaultValueAttribute';

export class CheckBoxComponent extends Component {
  constructor() {
    super(
      ComponentType.CheckBox,
      [FieldType.Boolean],
      [
        new LabelAttribute(false),
        new DefaultValueAttribute(false, (value) => typeof value === 'boolean'),
      ],
    );
  }

  protected validateAttributes() {}
}
