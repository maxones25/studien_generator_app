import { Injectable } from '@nestjs/common';
import { ComponentType } from '../../enums/component-type.enum';
import { FieldType } from '../../enums/field-type.enum';

@Injectable()
export class ComponentTypeService {
  private componentTypes = new Map<FieldType, ComponentType[]>();

  constructor() {
    this.componentTypes.set(FieldType.Date, [ComponentType.DatePicker]);
    this.componentTypes.set(FieldType.Boolean, [
      ComponentType.Switch,
      ComponentType.CheckBox,
    ]);
    this.componentTypes.set(FieldType.Enum, [ComponentType.Select]);
    this.componentTypes.set(FieldType.Number, [
      ComponentType.NumberPicker,
      ComponentType.Slider,
    ]);
    this.componentTypes.set(FieldType.Text, [ComponentType.TextField]);
  }

  isValidForEntityType(entityType: FieldType, componentType: ComponentType) {
    const types = this.componentTypes.get(entityType);
    if (types === undefined) return false;
    return types.includes(componentType);
  }

  getAll() {
    return Object.fromEntries(this.componentTypes);
  }
}
