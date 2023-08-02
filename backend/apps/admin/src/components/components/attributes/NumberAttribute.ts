import { Attribute } from '@admin/components/Attribute';
import { FormComponentAttributeDto } from '@admin/forms/pages/components/attributes/dtos/FormComponentAttributeDto';
import { BadRequestException } from '@nestjs/common';

export class RoundsAttribute extends Attribute {
  constructor(required: boolean) {
    super('rounds', required, "number");
  }
  
  public validate({ key, value }: FormComponentAttributeDto) {
    if(typeof value !== "number") throw new BadRequestException(`key ${key} must be a number`)
    if(Math.floor(value) !== value) throw new BadRequestException(`key ${key} must be an integer`)
    if(value <= 0) throw new BadRequestException(`key ${key} must be greater than 0`)
  }
}
