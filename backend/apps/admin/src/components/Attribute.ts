import { FormComponentAttributeDto } from '@admin/forms/forms/dtos/FormComponentAttributeDto';

export type AttributeType =
  | 'string'
  | 'boolean'
  | 'number'
  | 'date'
  | 'datetime'
  | 'time';

export abstract class Attribute {
  constructor(
    public readonly name: string,
    public readonly required: boolean,
    public readonly type: AttributeType,
  ) {}

  public abstract validate(attribute: FormComponentAttributeDto);
}
