import { BadRequestException, Injectable } from '@nestjs/common';
import {
  CheckBoxComponent,
  Component,
  DatePickerComponent,
  DateTimePickerComponent,
  HIITComponent,
  NumberPickerComponent,
  SelectComponent,
  SliderComponent,
  SwitchComponent,
  TextFieldComponent,
  TimePickerComponent,
} from './components';
import { EntityField } from '@entities/entity-field.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { ComponentType } from './component-type.enum';
import { FormComponentAttributeDto } from '@admin/modules/forms/pages/components/attributes/dtos/FormComponentAttributeDto';

@Injectable()
export class ComponentsService {
  private components = new Map<ComponentType, Component>([
    [ComponentType.DateTimePicker, new DateTimePickerComponent()],
    [ComponentType.DatePicker, new DatePickerComponent()],
    [ComponentType.TimePicker, new TimePickerComponent()],
    [ComponentType.CheckBox, new CheckBoxComponent()],
    [ComponentType.NumberPicker, new NumberPickerComponent()],
    [ComponentType.Select, new SelectComponent()],
    [ComponentType.Slider, new SliderComponent()],
    [ComponentType.Switch, new SwitchComponent()],
    [ComponentType.TextField, new TextFieldComponent()],
    [ComponentType.HIIT, new HIITComponent()],
  ]);

  constructor(
    @InjectRepository(EntityField)
    private entityFieldsRepository: Repository<EntityField>,
  ) {}

  async validateFormComponent(
    componentType: ComponentType,
    entityFieldIds: string[],
    attributes: FormComponentAttributeDto[],
  ) {
    const component = this.components.get(componentType);

    if (!component)
      throw new BadRequestException(
        `component type '${componentType}' not found`,
      );

    const entityFields = await this.entityFieldsRepository.find({
      where: entityFieldIds.map((id) => ({ id })),
    });

    component.validate(
      entityFields.map((entityField) => entityField.type),
      attributes,
    );
  }

  getAll() {
    return Object.values(Object.fromEntries(this.components));
  }
}
