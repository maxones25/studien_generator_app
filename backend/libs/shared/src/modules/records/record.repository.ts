import { DeepPartial, FindOptionsWhere, ObjectLiteral } from 'typeorm';
import { EntityRepository } from './entity.repository';

export abstract class RecordRepository<
  Entity extends ObjectLiteral,
> extends EntityRepository<Entity> {
  async create(data: DeepPartial<Entity>) {
    await this.db.insert(data);
    return data as Entity;
  }

  async update(id: string | FindOptionsWhere<Entity>, data: Partial<Entity>) {
    const { affected } = await this.db.update(id, data);
    return affected;
  }

  async hardDelete(id: string | FindOptionsWhere<Entity>) {
    const { affected } = await this.db.delete(id);
    return affected;
  }

  async delete(id: string | FindOptionsWhere<Entity>) {
    const { affected } = await this.db.delete(id);
    return affected;
  }
}
