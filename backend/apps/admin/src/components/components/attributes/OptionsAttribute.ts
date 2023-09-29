import { Attribute } from '@admin/components/Attribute';
import { FormComponentAttributeDto } from '@admin/forms/forms/dtos/FormComponentAttributeDto';
import { BadRequestException } from '@nestjs/common';
import array from '@shared/modules/array/isDistinct';

export class OptionsAttribute extends Attribute {
  constructor(required: boolean) {
    super('options', required, 'options');
  }

  validate({ key, value }: FormComponentAttributeDto) {
    if (!Array.isArray(value))
      throw new BadRequestException(`attribute ${key} must be an array`);

    if (!array.isDistinct(value))
      throw new BadRequestException(`attribute ${key} must be distinct`);

    value.forEach((option, i) => {
      if (typeof option !== 'string')
        throw new BadRequestException(`attribute.${i} ${key} must be a string`);
    });
  }
}
