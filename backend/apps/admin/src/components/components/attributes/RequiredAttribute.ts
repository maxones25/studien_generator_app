import { Attribute } from '@admin/components/Attribute';
import { FormComponentAttributeDto } from '@admin/forms/forms/dtos/FormComponentAttributeDto';
import { BadRequestException } from '@nestjs/common';

export class RequiredAttribute extends Attribute {
  constructor(required: boolean) {
    super('required', required, 'boolean');
  }

  validate({ key, value }: FormComponentAttributeDto) {
    if (typeof value !== "boolean")
      throw new BadRequestException(`attribute ${key} must be a ${this.type}`);
  }
}
