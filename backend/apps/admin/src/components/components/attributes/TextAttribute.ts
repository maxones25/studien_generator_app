import { Attribute } from '@admin/components/Attribute';
import { FormComponentAttributeDto } from '@admin/forms/forms/dtos/FormComponentAttributeDto';
import { BadRequestException } from '@nestjs/common';

export class TextAttribute extends Attribute {
  constructor(name: string, required: boolean) {
    super(name, required, 'string');
  }

  validate({ key, value }: FormComponentAttributeDto) {
    if (typeof value !== this.type)
      throw new BadRequestException(`attribute ${key} must be a ${this.type}`);
  }
}
