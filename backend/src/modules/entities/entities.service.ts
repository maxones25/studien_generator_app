import { Injectable, ConflictException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Entity } from '../../entities/entity.entity';
import { IsNull, Repository } from 'typeorm';
import { CreateEntityDto } from './dtos/CreateEntityDto';
import { CreateEntityFieldDto } from './dtos/CreateEntityFieldDto';
import { EntityField } from '../../entities/entity-field.entity';
import { UpdateEntityFieldDto } from './dtos/UpdateEntityFieldDto';
import { CreateFieldAttributeDto } from './dtos/CreateFieldAttributeDto';
import { EntityFieldAttribute } from '../../entities/entity-field-attribute.entity';

@Injectable()
export class EntitiesService {
  constructor(
    @InjectRepository(Entity)
    private entitiesRepository: Repository<Entity>,
    @InjectRepository(EntityField)
    private entityFieldsRepository: Repository<EntityField>,
    @InjectRepository(EntityFieldAttribute)
    private fieldAttributesRepository: Repository<EntityFieldAttribute>,
  ) {}

  async create(studyId: string, { name }: CreateEntityDto) {
    const abstractEntity = new Entity();
    abstractEntity.name = name;
    abstractEntity.studyId = studyId;

    await this.entitiesRepository.insert(abstractEntity);

    return abstractEntity;
  }

  async update(entityId: string, { name }: UpdateEntityFieldDto) {
    return this.entitiesRepository.update(entityId, { name });
  }

  async delete(entityId: string) {
    return this.entitiesRepository.delete(entityId);
  }

  getAll(studyId: string) {
    return this.entitiesRepository.find({
      where: {
        studyId,
      },
      select: {
        id: true,
        name: true,
      },
    });
  }

  async getById(studyId: string, entityId: string) {
    return this.entitiesRepository.findOne({
      where: {
        id: entityId,
        studyId,
      },
      relations: {
        fields: true,
      },
      select: {
        id: true,
        name: true,
        fields: {
          id: true,
          name: true,
          type: true,
        },
      },
    });
  }
}
