import { BaseEntity as TypeOrmBaseEntity } from '@entities/modules/BaseEntity';
import {
  EntityManager,
  EntityTarget,
  ObjectLiteral,
  Repository,
} from 'typeorm';

type CreateEntity<BaseEntity extends TypeOrmBaseEntity> = Omit<
  BaseEntity,
  'id' | 'createdAt' | 'modifiedAt' | 'deletedAt' | 'isDeleted'
>;

export abstract class TypeOrmRepository<
  BaseEntity extends TypeOrmBaseEntity,
  Entity extends ObjectLiteral,
> {
  protected readonly db: Repository<Entity>;

  constructor(target: EntityTarget<Entity>, entityManager: EntityManager) {
    this.db = entityManager.getRepository(target);
  }

  protected async create(data: CreateEntity<BaseEntity>) {
    await this.db.insert(data as any);
    return data as BaseEntity;
  }
}
