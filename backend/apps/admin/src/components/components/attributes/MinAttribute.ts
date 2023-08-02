import { Attribute } from '@admin/components/Attribute';
import { FormComponentAttributeDto } from '@admin/forms/pages/components/attributes/dtos/FormComponentAttributeDto';
import { BadRequestException } from '@nestjs/common';

export class MinAttribute extends Attribute {
  constructor(required: boolean) {
    super('min', required, "number");
  }

  validate({ key, value }: FormComponentAttributeDto) {
    if (typeof value !== this.type)
      throw new BadRequestException(`attribute ${key} must be a ${this.type}`);
  }
}
