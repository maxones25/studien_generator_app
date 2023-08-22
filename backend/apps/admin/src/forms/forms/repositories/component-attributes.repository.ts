import {
  AttributeKey,
  AttributeValue,
  AttritbuteRepository,
} from '@shared/modules/records/attribute.repository';
import { InjectRepository } from '@nestjs/typeorm';
import { FormComponentAttribute } from '@entities';
import { Repository } from 'typeorm';

export type ComponentAttributes = Partial<{
  defaultValue: any;
  label: string;
  min: number;
  max: number;
  maxLength: number;
  minLength: number;
}>;

export class ComponentAttributesRepository
  implements AttritbuteRepository<ComponentAttributes>
{
  constructor(
    @InjectRepository(FormComponentAttribute)
    private readonly db: Repository<FormComponentAttribute>,
  ) {}

  async get<Key extends AttributeKey<ComponentAttributes>>(
    componentId: string,
    key: Key,
  ): Promise<AttributeValue<ComponentAttributes, Key>> {
    const attribute = await this.db.findOne({ where: { componentId, key } });
    if (attribute === null) return null;
    return attribute.value;
  }

  async set<Key extends keyof ComponentAttributes>(
    componentId: string,
    key: Key,
    rawValue: AttributeValue<ComponentAttributes, Key>,
  ): Promise<void> {
    const value = JSON.stringify(rawValue) as any;
    await this.db.upsert(
      { componentId, key, value },
      { conflictPaths: { componentId: true, key: true } },
    );
  }

  async remove<Key extends keyof ComponentAttributes>(
    componentId: string,
    key: Key,
  ): Promise<number> {
    const { affected } = await this.db.delete({ componentId, key });
    return affected;
  }
  async isSet(
    componentId: string,
    key: keyof ComponentAttributes,
  ): Promise<boolean> {
    const value = await this.get(componentId, key);
    return value !== null;
  }

  async getAll(componentId: string): Promise<ComponentAttributes> {
    const attributes = await this.db.find({ where: { componentId } });
    return attributes.reduce<ComponentAttributes>((obj, attribute) => {
      obj[attribute.key] = attribute.value;
      return obj;
    }, {});
  }

  async removeAll(componentId: string): Promise<number> {
    const { affected } = await this.db.delete({ componentId });
    return affected;
  }
}
