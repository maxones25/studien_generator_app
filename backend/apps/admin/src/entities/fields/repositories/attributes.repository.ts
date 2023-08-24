import {
  EntityField,
  EntityFieldAttribute,
  EntityFieldAttributes,
} from '@entities';
import { InjectRepository } from '@nestjs/typeorm';
import {
  AttributeKey,
  AttributeValue,
  AttritbuteRepository as IAttritbuteRepository,
} from '@shared/modules/records/attribute.repository';
import { Repository } from 'typeorm';

export class AttributesRepository
  implements IAttritbuteRepository<EntityFieldAttributes>
{
  constructor(
    @InjectRepository(EntityFieldAttribute)
    private readonly db: Repository<EntityFieldAttribute>,
  ) {}

  async get<Key extends AttributeKey<EntityFieldAttributes>>(
    fieldId: string,
    key: Key,
  ): Promise<AttributeValue<EntityFieldAttributes, Key>> {
    const attribute = await this.db.findOne({ where: { fieldId, key } });
    if (attribute === null) return null;
    return attribute.value;
  }

  async set<Key extends AttributeKey<EntityFieldAttributes>>(
    fieldId: string,
    key: Key,
    value: AttributeValue<EntityFieldAttributes, Key>,
  ): Promise<void> {
    await this.db.upsert(
      { fieldId, key, value },
      { conflictPaths: { fieldId: true, key: true } },
    );
  }

  async remove<Key extends AttributeKey<EntityFieldAttributes>>(
    fieldId: string,
    key: Key,
  ): Promise<number> {
    const { affected } = await this.db.delete({ fieldId, key });
    return affected;
  }

  async isSet(
    fieldId: string,
    key: AttributeKey<EntityFieldAttributes>,
  ): Promise<boolean> {
    const value = await this.get(fieldId, key);
    return value !== null;
  }

  async getAll(fieldId: string): Promise<EntityFieldAttributes> {
    const attributes = await this.db.find({ where: { fieldId } });
    return attributes.reduce<EntityFieldAttributes>(
      (obj, attribute) => {
        obj[attribute.key] = attribute.value;
        return obj;
      },
      { values: undefined },
    );
  }

  async removeAll(fieldId: string): Promise<number> {
    const { affected } = await this.db.delete({ fieldId });
    return affected;
  }
}
