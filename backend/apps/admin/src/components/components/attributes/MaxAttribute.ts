import { Attribute } from '@admin/components/Attribute';
import { FormComponentAttributeDto } from '@admin/forms/pages/components/attributes/dtos/FormComponentAttributeDto';
import { BadRequestException } from '@nestjs/common';

export class MaxAttribute extends Attribute {
  constructor(required: boolean) {
    super('max', required);
  }

  validate({ key, value }: FormComponentAttributeDto) {
    if (typeof value !== 'number')
      throw new BadRequestException(`attribute ${key} must be a number`);
  }
}
