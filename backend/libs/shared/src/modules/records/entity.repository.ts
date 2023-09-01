import { ObjectLiteral, Repository } from 'typeorm';

export abstract class EntityRepository<Entity extends ObjectLiteral> {
  constructor(protected readonly db: Repository<Entity>) {}
}
