import {
  DeepPartial,
  FindOptionsWhere,
  ObjectLiteral,
  Repository,
} from 'typeorm';

export class RecordRepository<Entity extends ObjectLiteral> {
  constructor(protected readonly db: Repository<Entity>) {}

  async create(data: DeepPartial<Entity>) {
    await this.db.insert(data);
    return data;
  }

  async update(id: string | FindOptionsWhere<Entity>, data: Partial<Entity>) {
    const { affected } = await this.db.update(id, data);
    return affected;
  }

  async delete(id: string | FindOptionsWhere<Entity>) {
    const { affected } = await this.db.delete(id);
    return affected;
  }
}
