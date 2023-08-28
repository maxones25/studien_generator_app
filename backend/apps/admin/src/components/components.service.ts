import { BadRequestException, Injectable } from '@nestjs/common';
import { EntityField } from '@entities/entity-field.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { ComponentType } from './component-type.enum';
import { Component } from './Component';
import { DateTimePickerComponent } from './components/DateTimePickerComponent';
import { DatePickerComponent } from './components/DatePickerComponent';
import { TimePickerComponent } from './components/TimePickerComponent';
import { CheckBoxComponent } from './components/CheckBoxComponent';
import { NumberPickerComponent } from './components/NumberPicker';
import { SelectComponent } from './components/SelectComponent';
import { SliderComponent } from './components/SliderComponent';
import { SwitchComponent } from './components/SwitchComponent';
import { TextFieldComponent } from './components/TextFieldComponent';
import { HIITComponent } from './components/HIITComponents';
import { AttributeType } from './Attribute';
import { FormComponentAttributeDto } from '@admin/forms/forms/dtos/FormComponentAttributeDto';
import { TextComponent } from './components/TextComponent';

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
    [ComponentType.Text, new TextComponent()],
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

    const types = await this.getEntityTypesByIds(entityFieldIds);

    component.validate(types, attributes);
  }

  async getEntityTypesByIds(ids: string[]) {
    const entityFields = await this.entityFieldsRepository.find({
      where: ids.map((id) => ({ id })),
    });
    return entityFields.map((entityField) => entityField.type);
  }

  getAll() {
    return Object.values(Object.fromEntries(this.components)).map(
      (component) => ({
        ...component,
        attributes: component
          .getAttributes()
          .reduce<
            Record<
              string,
              { name: String; required: boolean; type: AttributeType }
            >
          >((map, attribute) => {
            map[attribute.name] = {
              name: attribute.name,
              required: attribute.required,
              type: attribute.type,
            };
            return map;
          }, {}),
      }),
    );
  }
}
