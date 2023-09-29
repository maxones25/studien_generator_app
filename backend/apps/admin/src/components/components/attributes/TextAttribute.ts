import { Attribute } from '@admin/components/Attribute';
import { FormComponentAttributeDto } from '@admin/forms/forms/dtos/FormComponentAttributeDto';
import { BadRequestException } from '@nestjs/common';

export class TextAttribute extends Attribute {
  private readonly canBeEmpty: boolean;
  constructor({
    name,
    required,
    canBeEmpty = false,
  }: {
    name: string;
    required: boolean;
    canBeEmpty?: boolean;
  }) {
    super(name, required, 'string');
    this.canBeEmpty = canBeEmpty;
  }

  validate({ key, value }: FormComponentAttributeDto) {
    if (typeof value !== this.type)
      throw new BadRequestException(`attribute ${key} must be a ${this.type}`);

    if (!this.canBeEmpty && value === '')
      throw new BadRequestException(`attribute ${key} can not be empty`);
  }
}
