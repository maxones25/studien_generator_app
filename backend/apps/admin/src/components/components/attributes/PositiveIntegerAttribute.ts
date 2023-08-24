import { Attribute } from '@admin/components/Attribute';
import { FormComponentAttributeDto } from '@admin/forms/forms/dtos/FormComponentAttributeDto';
import { BadRequestException } from '@nestjs/common';

export class PositiveIntegerAttribute extends Attribute {
  constructor(name: string, required: boolean) {
    super(name, required, 'number');
  }

  public validate({ key, value }: FormComponentAttributeDto) {
    if (typeof value !== 'number')
      throw new BadRequestException(`key ${key} must be a number`);
    if (Math.floor(value) !== value)
      throw new BadRequestException(`key ${key} must be an integer`);
    if (value <= 0)
      throw new BadRequestException(`key ${key} must be greater than 0`);
  }
}
