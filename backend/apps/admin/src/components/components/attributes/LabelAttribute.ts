import { Attribute } from '@admin/components/Attribute';
import { FormComponentAttributeDto } from '@admin/forms/pages/components/attributes/dtos/FormComponentAttributeDto';
import { BadRequestException } from '@nestjs/common';

export class LabelAttribute extends Attribute {
  constructor(required: boolean) {
    super('label', required);
  }

  validate({ key, value }: FormComponentAttributeDto) {
    if (typeof value !== 'string')
      throw new BadRequestException(`attribute ${key} must be a string`);
  }
}
