import { FieldType } from '../../enums/field-type.enum';
import { ComponentType } from '../../enums/component-type.enum';
import { BadRequestException } from '@nestjs/common';
import { FormComponentAttributeDto } from '../forms/pages/components/attributes/dtos/FormComponentAttributeDto';
import { isValid } from 'date-and-time';

export abstract class ComponentAttribute {
  constructor(
    public readonly name: string,
    public readonly required: boolean,
  ) {}

  public abstract validate(attribute: FormComponentAttributeDto);
}

export abstract class Component {
  constructor(
    protected readonly name: ComponentType,
    protected readonly entityFields: FieldType[],
    protected readonly attributes: ComponentAttribute[],
  ) {}

  private validateFieldTypes(types: FieldType[]) {
    for (const fieldType of this.entityFields) {
      const index = types.findIndex((type) => type === fieldType);
      if (index === -1)
        throw new BadRequestException(
          `entity field type ${fieldType} required`,
        );
      types[index] = undefined;
    }
  }

  validate(types: FieldType[], attributes: FormComponentAttributeDto[]) {
    this.validateFieldTypes(types);
    this.validateAttributes(this.parseAttributes(attributes));
    return true;
  }

  private parseAttributes(attributes: FormComponentAttributeDto[]) {
    const map: { [key: string]: any } = {};

    for (const attribute of attributes) {
      const config = this.attributes.find((a) => a.name === attribute.key);

      if (!config)
        throw new BadRequestException(`attribute ${attribute.key} unknown`);

      config.validate(attribute);

      map[attribute.key] = attribute.value;
    }

    for (const { name } of this.attributes.filter((a) => a.required)) {
      if (map[name] === undefined)
        throw new BadRequestException(`attribute ${name} required`);
    }

    return map;
  }

  protected abstract validateAttributes(attributes: { [key: string]: any });
}

export class MinComponentAttribute extends ComponentAttribute {
  constructor(required: boolean) {
    super('min', required);
  }

  validate({ key, value }: FormComponentAttributeDto) {
    if (typeof value !== 'number')
      throw new BadRequestException(`attribute ${key} must be a number`);
  }
}

export class MaxComponentAttribute extends ComponentAttribute {
  constructor(required: boolean) {
    super('max', required);
  }

  validate({ key, value }: FormComponentAttributeDto) {
    if (typeof value !== 'number')
      throw new BadRequestException(`attribute ${key} must be a number`);
  }
}

export class DefaultComponentAttribute extends ComponentAttribute {
  public readonly type: (value: any) => boolean;

  constructor(required: boolean, type: (value: any) => boolean) {
    super('defaultValue', required);
    this.type = type;
  }

  validate({ key, value }: FormComponentAttributeDto) {
    if (!this.type(value))
      throw new BadRequestException(`attribute ${key} has invalid type`);
  }
}

export class LabelComponentAttribute extends ComponentAttribute {
  constructor(required: boolean) {
    super('label', required);
  }

  validate({ key, value }: FormComponentAttributeDto) {
    if (typeof value !== 'string')
      throw new BadRequestException(`attribute ${key} must be a string`);
  }
}

export class SliderComponent extends Component {
  constructor() {
    super(
      ComponentType.Slider,
      [FieldType.Number],
      [
        new MinComponentAttribute(true),
        new MaxComponentAttribute(true),
        new DefaultComponentAttribute(
          false,
          (value) => typeof value === 'number',
        ),
        new LabelComponentAttribute(false),
      ],
    );
  }

  protected validateAttributes({ min, max, defaultValue }) {
    if (min >= max)
      throw new BadRequestException(`attribute min must be smaller than max`);

    if (
      typeof defaultValue === 'number' &&
      (defaultValue < min || defaultValue > max)
    )
      throw new BadRequestException(
        `default must be between min and max, default=${defaultValue}, min=${min}, max=${max}`,
      );
  }
}

export class CheckBoxComponent extends Component {
  constructor() {
    super(ComponentType.CheckBox, [FieldType.Boolean], []);
  }

  protected validateAttributes(
    attributes: FormComponentAttributeDto[],
  ): boolean {
    throw new Error('Method not implemented.');
  }
}

export class DatePickerComponent extends Component {
  constructor() {
    super(
      ComponentType.DatePicker,
      [FieldType.Date],
      [
        new LabelComponentAttribute(false),
        new DefaultComponentAttribute(false, (value) =>
          isValid(value, 'YYYY-MM-DD'),
        ),
      ],
    );
  }

  protected validateAttributes() {}
}

export class NumberPickerComponent extends Component {
  constructor() {
    super(ComponentType.NumberPicker, [FieldType.Number], []);
  }

  protected validateAttributes(
    attributes: FormComponentAttributeDto[],
  ): boolean {
    throw new Error('Method not implemented.');
  }
}

export class SelectComponent extends Component {
  constructor() {
    super(ComponentType.Select, [FieldType.Enum], []);
  }

  protected validateAttributes(
    attributes: FormComponentAttributeDto[],
  ): boolean {
    throw new Error('Method not implemented.');
  }
}

export class SwitchComponent extends Component {
  constructor() {
    super(ComponentType.Switch, [FieldType.Boolean], []);
  }

  protected validateAttributes(
    attributes: FormComponentAttributeDto[],
  ): boolean {
    throw new Error('Method not implemented.');
  }
}

export class TextFieldComponent extends Component {
  constructor() {
    super(ComponentType.TextField, [FieldType.Text], []);
  }

  protected validateAttributes(
    attributes: FormComponentAttributeDto[],
  ): boolean {
    throw new Error('Method not implemented.');
  }
}

export class HIITComponent extends Component {
  constructor() {
    super(ComponentType.HIIT, [FieldType.DateTime, FieldType.DateTime], []);
  }

  protected validateAttributes(
    attributes: FormComponentAttributeDto[],
  ): boolean {
    throw new Error('Method not implemented.');
  }
}

export class DateTimePickerComponent extends Component {
  constructor() {
    super(
      ComponentType.DateTimePicker,
      [FieldType.DateTime],
      [
        new LabelComponentAttribute(false),
        new DefaultComponentAttribute(false, (value) =>
          isValid(value as string, 'YYYY-MM-DDTHH:mm:ss'),
        ),
      ],
    );
  }

  protected validateAttributes() {}
}

export class TimePickerComponent extends Component {
  constructor() {
    super(ComponentType.TimePicker, [FieldType.Time], []);
  }

  protected validateAttributes(
    attributes: FormComponentAttributeDto[],
  ): boolean {
    throw new Error('Method not implemented.');
  }
}
