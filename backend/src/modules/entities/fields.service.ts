import { Injectable, ConflictException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Entity } from '../../entities/entity.entity';
import { Repository } from 'typeorm';
import { CreateEntityDto } from './dtos/CreateEntityDto';
import { CreateEntityFieldDto } from './dtos/CreateEntityFieldDto';
import { EntityField } from '../../entities/entity-field.entity';
import { UpdateEntityFieldDto } from './dtos/UpdateEntityFieldDto';
import { CreateFieldAttributeDto } from './dtos/CreateFieldAttributeDto';
import { EntityFieldAttribute } from '../../entities/entity-field-attribute.entity';

@Injectable()
export class FieldsService {
  constructor(
    @InjectRepository(EntityField)
    private entityFieldsRepository: Repository<EntityField>,
  ) {}

  async add(entityId: string, { name, type }: CreateEntityFieldDto) {
    const entityField = new EntityField();

    entityField.entityId = entityId;
    entityField.name = name;
    entityField.type = type;

    await this.entityFieldsRepository.insert(entityField);

    return entityField;
  }

  async getAll(entityId: string) {
    return this.entityFieldsRepository.find({ where: { entityId } });
  }

  async update(fieldId: string, { name, type }: UpdateEntityFieldDto) {
    return this.entityFieldsRepository.update(fieldId, { name, type });
  }

  async delete(fieldId: string) {
    return this.entityFieldsRepository.delete({
      id: fieldId,
    });
  }
}
