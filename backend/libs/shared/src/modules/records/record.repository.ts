import { DeepPartial, FindOptionsWhere, ObjectLiteral } from 'typeorm';
import { EntityRepository } from './entity.repository';
import { BaseEntity } from '@entities/modules/schema/BaseEntity';
import datetime from '../datetime/datetime';

export abstract class RecordRepository<
  Entity extends BaseEntity,
  ObjectEntity extends ObjectLiteral = Entity,
> extends EntityRepository<Entity> {
  async create(data: DeepPartial<Entity>) {
    const entity = data as unknown as DeepPartial<ObjectEntity>;
    await this.db.insert(entity);
    return data as Entity;
  }

  async update(
    id: string | FindOptionsWhere<Entity>,
    data: Partial<ObjectEntity>,
  ) {
    const { affected } = await this.db.update(id, data as any);
    return affected;
  }

  async hardDelete(id: string | FindOptionsWhere<Entity>) {
    const { affected } = await this.db.delete(id);
    return affected;
  }

  async softDelete(id: string | FindOptionsWhere<Entity>) {
    const deletedAt = datetime.currentDate();
    const data = { deletedAt } as any;
    return await this.update(id, data);
  }

  async restore(id: string | FindOptionsWhere<Entity>) {
    const deletedAt = null;
    const data = { deletedAt } as any;
    return await this.update(id, data);
  }

  async isDeleted(id: string) {
    const entity = await this.db.findOneBy({ id } as any);
    if (!entity) return true;
    return entity.deletedAt !== null;
  }
}

export abstract class RecordRepository2<
  Entity extends BaseEntity,
  ObjectEntity extends ObjectLiteral = Entity,
> extends EntityRepository<Entity> {
  protected async createRecord(data: DeepPartial<Entity>) {
    const entity = data as unknown as DeepPartial<ObjectEntity>;
    await this.db.insert(entity);
    return data as Entity;
  }

  protected async updateRecord(
    id: string | FindOptionsWhere<Entity>,
    data: Partial<ObjectEntity>,
  ) {
    const { affected } = await this.db.update(id, data as any);
    return affected;
  }

  protected async hardDeleteRecord(id: string | FindOptionsWhere<Entity>) {
    const { affected } = await this.db.delete(id);
    return affected;
  }

  protected async softDeleteRecord(id: string | FindOptionsWhere<Entity>) {
    const deletedAt = datetime.currentDate();
    const data = { deletedAt } as any;
    return await this.updateRecord(id, data);
  }

  protected async restoreRecord(id: string | FindOptionsWhere<Entity>) {
    const deletedAt = null;
    const data = { deletedAt } as any;
    return await this.updateRecord(id, data);
  }

  protected async isDeletedRecord(id: string) {
    const entity = await this.db.findOneBy({ id } as any);
    if (!entity) return true;
    return entity.deletedAt !== null;
  }
}
