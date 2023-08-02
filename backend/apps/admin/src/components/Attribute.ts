import { FormComponentAttributeDto } from '@admin/forms/pages/components/attributes/dtos/FormComponentAttributeDto';

export abstract class Attribute {
  constructor(
    public readonly name: string,
    public readonly required: boolean,
  ) {}

  public abstract validate(attribute: FormComponentAttributeDto);
}
