import {
  Entity as EntitySchema,
  EntityField as EntityFieldSchema,
} from '@entities/schema';
import { Entity, Field, IEntitiesRepository } from '@admin/entities/domain';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { Id, UpdatedResult } from '@shared/modules/core';

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

  async getEntityByStudy(studyId: string, id: string): Promise<Entity> {
    const item = await this.entities.findOne({
      where: {
        id,
        studyId,
      },
    });
    if (item === null) return null;
    return new Entity(item);
  }

  async getAll(studyId: string): Promise<Entity[]> {
    const items = await this.entities.find({
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
    return items.map((item) => new Entity(item));
  }

  async getById(entityId: string): Promise<Entity> {
    const item = await this.entities.findOne({
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
    if (item === null) return null;
    return new Entity(item);
  }

  async existsEntityName(studyId: string, name: string): Promise<boolean> {
    const entity = await this.entities.findOneBy({ studyId, name });
    return entity !== null;
  }

  async updateEntity({ id, name }: Entity): Promise<UpdatedResult> {
    const { affected } = await this.entities.update({ id }, { name });
    return affected;
  }

  async deleteEntity(id: Id): Promise<number> {
    const { affected } = await this.entities.delete({ id });
    return affected;
  }

  async removeField(id: Id): Promise<number> {
    const { affected } = await this.fields.delete({ id });
    return affected;
  }

  async updateField({ id, name, type }: Field): Promise<number> {
    const { affected } = await this.fields.update({ id }, { name, type });
    return affected;
  }

  async addField(field: Field): Promise<Id> {
    await this.fields.insert(field);
    return field.id;
  }

  async getFieldByStudy(studyId: string, id: string): Promise<Field> {
    const item = await this.fields.findOne({
      where: { id, entity: { studyId } },
    });
    if (item === null) return null;
    return new Field(item);
  }

  async getFieldsByEntity(entityId: string) {
    const items = await this.fields.find({
      where: {
        entityId,
      },
      order: {
        createdAt: 'ASC',
      },
      select: {
        id: true,
        name: true,
        type: true,
      },
    });

    return items.map((item) => new Field(item));
  }
}
