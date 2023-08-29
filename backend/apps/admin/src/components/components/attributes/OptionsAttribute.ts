import { Attribute } from '@admin/components/Attribute';
import { FormComponentAttributeDto } from '@admin/forms/forms/dtos/FormComponentAttributeDto';
import { BadRequestException } from '@nestjs/common';

export class OptionsAttribute extends Attribute {
  constructor(required: boolean) {
    super('options', required, 'options');
  }

  validate({ key, value }: FormComponentAttributeDto) {
    if (!Array.isArray(value))
      throw new BadRequestException(`attribute ${key} must be an array`);

    value.forEach((option, i) => {
      if (typeof option !== 'string')
        throw new BadRequestException(`attribute.${i} ${key} must be a string`);
    });
  }
}
