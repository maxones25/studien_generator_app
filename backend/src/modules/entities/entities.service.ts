import { Injectable, ConflictException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { AbstractEntity } from '../../entities/abstract-entity.entity';
import { ConcreteEntity } from '../../entities/concrete-entity.entity';
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
    // @InjectEntityManager()
    // private entityManager: EntityManager,
    @InjectRepository(AbstractEntity)
    private abstractEntitiesRepository: Repository<AbstractEntity>,
    @InjectRepository(ConcreteEntity)
    private concreteEntitiesRepository: Repository<ConcreteEntity>,
    @InjectRepository(EntityField)
    private entityFieldsRepository: Repository<EntityField>,
    @InjectRepository(EntityFieldAttribute)
    private fieldAttributesRepository: Repository<EntityFieldAttribute>,
  ) {}

  async create(studyId: string, { name }: CreateEntityDto) {
    const abstractEntity = new AbstractEntity();
    abstractEntity.name = name;
    abstractEntity.studyId = studyId;

    await this.abstractEntitiesRepository.insert(abstractEntity);

    return abstractEntity;
  }

  async addToStudy(entityId: string, studyId: string) {
    const concreteEntites = await this.concreteEntitiesRepository.find({
      where: {
        abstractEntityId: entityId,
        studyId,
      },
    });

    if (concreteEntites.length > 0) throw new ConflictException();

    const concreteEntity = new ConcreteEntity();

    concreteEntity.studyId = studyId;
    concreteEntity.abstractEntityId = entityId;

    await this.concreteEntitiesRepository.insert(concreteEntity);

    return concreteEntity;
  }

  async addToGroup(entityId: string, studyId: string, groupId: string) {
    const concreteEntites = await this.concreteEntitiesRepository.find({
      where: [
        {
          abstractEntityId: entityId,
          studyId,
          groupId: IsNull(),
        },
        {
          abstractEntityId: entityId,
          studyId,
          groupId,
        },
      ],
    });

    if (concreteEntites.length > 0) throw new ConflictException();

    const concreteEntity = new ConcreteEntity();

    concreteEntity.abstractEntityId = entityId;
    concreteEntity.studyId = studyId;
    concreteEntity.groupId = groupId;

    await this.concreteEntitiesRepository.insert(concreteEntity);

    return concreteEntity;
  }

  async removeFromStudy(entityId: string, studyId: string) {
    this.concreteEntitiesRepository.delete({
      studyId,
      abstractEntityId: entityId,
      groupId: IsNull(),
    });
  }

  async removeFromGroup(entityId: string, groupId: string) {
    this.concreteEntitiesRepository.delete({
      abstractEntityId: entityId,
      groupId,
    });
  }

  async getByStudy(studyId: string) {
    const entities = await this.abstractEntitiesRepository.find({
      where: {
        studyId,
      },
      relations: {
        concreteEntites: {
          group: true,
        },
      },
      select: {
        id: true,
        name: true,
        concreteEntites: {
          id: true,
          group: {
            id: true,
            name: true,
          },
        },
      },
    });

    return entities.map(({ concreteEntites, name, id }) => {
      const groups = concreteEntites
        .filter((entity) => entity.group !== null)
        .map(({ group }) => group);
      const isStudy = groups.length === 0 && concreteEntites.length === 1;
      return {
        id,
        name,
        isStudy,
        groups,
      };
    });
  }

  async addField(entityId: string, { name, type }: CreateEntityFieldDto) {
    const entityField = new EntityField();

    entityField.abstractEntityId = entityId;
    entityField.name = name;
    entityField.type = type;

    await this.entityFieldsRepository.insert(entityField);

    return entityField;
  }

  async getById(entityId: string) {
    return this.abstractEntitiesRepository.find({
      where: {
        id: entityId,
        fields: {
          concreteEntityId: IsNull(),
        },
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

  async updateField(fieldId: string, { name, type }: UpdateEntityFieldDto) {
    return this.entityFieldsRepository.update(fieldId, { name, type });
  }

  async deleteField(fieldId: string) {
    return this.entityFieldsRepository.delete({
      id: fieldId,
    });
  }

  async addAttribute(fieldId: string, { key, value }: CreateFieldAttributeDto) {
    const attributes = await this.fieldAttributesRepository.find({
      where: { fieldId, key, concreteEntityId: IsNull() },
    });

    if (attributes.length > 0) throw new ConflictException();

    const fieldAttribute = new EntityFieldAttribute();

    fieldAttribute.fieldId = fieldId;
    fieldAttribute.key = key;
    fieldAttribute.value = value;

    await this.fieldAttributesRepository.insert(fieldAttribute);

    return fieldAttribute;
  }

  async getAttributes(fieldId: string) {
    return this.fieldAttributesRepository.find({
      where: { fieldId },
      select: {
        key: true,
        value: true,
      },
    });
  }
}
