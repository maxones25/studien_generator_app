import {
  Entity as EntitySchema,
  EntityField as EntityFieldSchema,
} from '@entities/schema';
import { Entity, IEntitiesRepository } from '@admin/entities/domain';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { UpdatedResult } from '@shared/modules/core';

export class EntitiesRepository implements IEntitiesRepository {
  constructor(
    @InjectRepository(EntitySchema)
    private readonly entities: Repository<EntitySchema>,
    @InjectRepository(EntityFieldSchema)
    private readonly fields: Repository<EntityFieldSchema>,
  ) {}

  async createEntity(entity: Entity): Promise<string> {
    await this.entities.insert(entity);
    return entity.id;
  }

  async getRelatedByStudy(studyId: string, id: string) {
    return this.entities.findOne({
      where: {
        id,
        studyId,
      },
    });
  }

  async getAll(studyId: string) {
    return this.entities.find({
      where: {
        studyId,
      },
      select: {
        id: true,
        createdAt: true,
        modifiedAt: true,
        deletedAt: true,
        name: true,
      },
    });
  }

  async getById(entityId: string) {
    return this.entities.findOne({
      where: {
        id: entityId,
      },
      relations: {
        fields: true,
      },
      select: {
        id: true,
        createdAt: true,
        modifiedAt: true,
        deletedAt: true,
        name: true,
        fields: {
          id: true,
          name: true,
          type: true,
        },
      },
    });
  }

  async existsEntityName(studyId: string, name: string): Promise<boolean> {
    const entity = await this.entities.findOneBy({ studyId, name });
    return entity !== null;
  }

  async updateEntity({ id, name }: Entity): Promise<UpdatedResult> {
    const { affected } = await this.entities.update({ id }, { name });
    return affected;
  }

  async deleteEntity(id: string): Promise<number> {
    const { affected } = await this.entities.delete({ id });
    return affected;
  }
}
