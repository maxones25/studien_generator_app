import { Attribute } from '@admin/forms/components/Attribute';
import { FormComponentAttributeDto } from '@admin/forms/forms/dtos/FormComponentAttributeDto';
import { BadRequestException } from '@nestjs/common';

export class MaxAttribute extends Attribute {
  constructor(required: boolean) {
    super('max', required, 'number');
  }

  validate({ key, value }: FormComponentAttributeDto) {
    if (typeof value !== this.type)
      throw new BadRequestException(`attribute ${key} must be a ${this.type}`);
  }
}
