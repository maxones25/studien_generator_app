import { FieldType } from '../../enums/field-type.enum';
import { ComponentType } from '../../enums/component-type.enum';

export class Component {
  constructor(
    protected readonly name: ComponentType,
    protected readonly entityFields: FieldType[],
  ) {}

  areFieldTypesValid(types: FieldType[]) {
    if (types.length !== this.entityFields.length) return false;
    return this.entityFields.every((entityField) =>
      types.includes(entityField),
    );
  }
}

export class SliderComponent extends Component {
  constructor() {
    super(ComponentType.Slider, [FieldType.Number]);
  }
}

export class CheckBoxComponent extends Component {
  constructor() {
    super(ComponentType.CheckBox, [FieldType.Boolean]);
  }
}

export class DatePickerComponent extends Component {
  constructor() {
    super(ComponentType.DatePicker, [FieldType.Date]);
  }
}

export class NumberPickerComponent extends Component {
  constructor() {
    super(ComponentType.NumberPicker, [FieldType.Number]);
  }
}

export class SelectComponent extends Component {
  constructor() {
    super(ComponentType.Select, [FieldType.Enum]);
  }
}

export class SwitchComponent extends Component {
  constructor() {
    super(ComponentType.Switch, [FieldType.Boolean]);
  }
}

export class TextFieldComponent extends Component {
  constructor() {
    super(ComponentType.TextField, [FieldType.Text]);
  }
}

export class HIITComponent extends Component {
  constructor() {
    super(ComponentType.HIIT, [FieldType.DateTime, FieldType.DateTime]);
  }
}

export class DateTimePickerComponent extends Component {
  constructor() {
    super(ComponentType.DateTimePicker, [FieldType.DateTime]);
  }
}

export class TimePickerComponent extends Component {
  constructor() {
    super(ComponentType.TimePicker, [FieldType.Time]);
  }
}
