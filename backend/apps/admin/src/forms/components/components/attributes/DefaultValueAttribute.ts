import { Attribute, AttributeType } from '@admin/forms/components/Attribute';
import { FormComponentAttributeDto } from '@admin/forms/forms/dtos/FormComponentAttributeDto';
import { BadRequestException } from '@nestjs/common';

export class DefaultValueAttribute extends Attribute {
  public readonly validateCallback: (value: any) => boolean;

  constructor(
    required: boolean,
    type: AttributeType,
    validateCallback: (value: any) => boolean,
  ) {
    super('defaultValue', required, type);
    this.validateCallback = validateCallback;
  }

  validate({ key, value }: FormComponentAttributeDto) {
    if (!this.validateCallback(value))
      throw new BadRequestException(`attribute ${key} has invalid type`);
  }
}
