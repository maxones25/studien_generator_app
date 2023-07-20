import { Injectable } from '@nestjs/common';
import { ComponentType } from '../../enums/component-type.enum';
import { CheckBoxComponent, Component, DatePickerComponent, DateTimePickerComponent, HIITComponent, NumberPickerComponent, SelectComponent, SliderComponent, SwitchComponent, TextFieldComponent, TimePickerComponent } from './components';
import { EntityField } from '../../entities/entity-field.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

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

  async areEntityFieldsValid(
    componentType: ComponentType,
    entityFieldIds: string[],
  ) {
    const entityFields = await this.entityFieldsRepository.find({
      where: entityFieldIds.map((id) => ({ id })),
    })

    const component = this.components.get(componentType);

    if (!component) return false;
    
    return component.areFieldTypesValid(
      entityFields.map((entityField) => entityField.type),
    );
  }

  getAll() {
    return Object.values(Object.fromEntries(this.components))
  }
}
