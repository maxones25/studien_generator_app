import { FieldType } from '@shared/enums/field-type.enum';
import { Component } from '../Component';
import { ComponentType } from '../component-type.enum';
import { PositiveIntegerAttribute } from './attributes/PositiveIntegerAttribute';

export class HIITComponent extends Component {
  constructor() {
    super(ComponentType.HIIT, [FieldType.DateTime, FieldType.DateTime], [
        new PositiveIntegerAttribute("warmUp", true),
        new PositiveIntegerAttribute("rounds", true),
        new PositiveIntegerAttribute("highIntensity", true),
        new PositiveIntegerAttribute("lowIntensity", true),
        new PositiveIntegerAttribute("coolDown", true),
    ]);
  }

  protected validateAttributes(attributes) {}
}
