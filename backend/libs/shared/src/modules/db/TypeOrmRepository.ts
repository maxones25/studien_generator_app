import {
  DeepPartial,
  FindManyOptions,
  FindOneOptions,
  FindOptionsWhere,
  ObjectLiteral,
  QueryRunner,
  Repository,
} from 'typeorm';
import datetime from '../datetime/datetime';
import { BaseEntity } from '@entities/modules/schema';

export class TypeOrmRepository<
  Entity extends BaseEntity,
  ObjectEntity extends ObjectLiteral = Entity,
> {
  constructor(protected readonly db: Repository<Entity>) {}

  public async create(data: DeepPartial<Entity>) {
    const entity = data as unknown as DeepPartial<ObjectEntity>;
    await this.db.insert(entity);
    return data as Entity;
  }

  public async update(
    id: string | FindOptionsWhere<Entity>,
    data: Partial<ObjectEntity>,
  ) {
    const { affected } = await this.db.update(id, data as any);
    return affected;
  }

  public async hardDelete(id: string | FindOptionsWhere<Entity>) {
    const { affected } = await this.db.delete(id);
    return affected;
  }

  public async softDelete(id: string | FindOptionsWhere<Entity>) {
    const deletedAt = datetime.currentDate();
    const data = { deletedAt } as any;
    return await this.update(id, data);
  }

  public async restore(id: string | FindOptionsWhere<Entity>) {
    const deletedAt = null;
    const data = { deletedAt } as any;
    return await this.update(id, data);
  }

  public async isDeleted(id: string) {
    const entity = await this.db.findOneBy({ id } as any);
    if (!entity) return true;
    return entity.deletedAt !== null;
  }

  public find(options?: FindManyOptions<Entity>) {
    return this.db.find(options);
  }

  public findOne(options?: FindOneOptions<Entity>) {
    return this.db.findOne(options);
  }

  public createQueryBuilder(alias?: string, queryRunner?: QueryRunner) {
    return this.db.createQueryBuilder(alias, queryRunner);
  }
}
