import { FieldType } from '@shared/enums/field-type.enum';
import { ComponentType } from './component-type.enum';
import { BadRequestException } from '@nestjs/common';
import { FormComponentAttributeDto } from '@admin/forms/pages/components/attributes/dtos/FormComponentAttributeDto';
import { Attribute } from './Attribute';

export abstract class Component {
  constructor(
    protected readonly name: ComponentType,
    protected readonly entityFields: FieldType[],
    protected readonly attributes: Attribute[],
  ) {}

  public getAttributes(){
    return this.attributes;
  }

  private validateFieldTypes(types: FieldType[]) {
    for (const fieldType of this.entityFields) {
      const index = types.findIndex((type) => type === fieldType);
      if (index === -1)
        throw new BadRequestException(
          `entity field type ${fieldType} required`,
        );
      types[index] = undefined;
    }
  }

  validate(types: FieldType[], attributes: FormComponentAttributeDto[]) {
    this.validateFieldTypes(types);
    this.validateAttributes(this.parseAttributes(attributes));
    return true;
  }

  private parseAttributes(attributes: FormComponentAttributeDto[]) {
    const map: { [key: string]: any } = {};

    for (const attribute of attributes) {
      const config = this.attributes.find((a) => a.name === attribute.key);

      if (!config)
        throw new BadRequestException(`attribute ${attribute.key} unknown`);

      config.validate(attribute);

      map[attribute.key] = attribute.value;
    }

    for (const { name } of this.attributes.filter((a) => a.required)) {
      if (map[name] === undefined)
        throw new BadRequestException(`attribute ${name} required`);
    }

    return map;
  }

  protected abstract validateAttributes(attributes: { [key: string]: any });
}
