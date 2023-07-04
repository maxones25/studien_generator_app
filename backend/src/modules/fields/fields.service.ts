import { Injectable, ConflictException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { In, IsNull, Repository } from 'typeorm';
import { CreateEntityFieldDto } from './dtos/CreateEntityFieldDto';
import { EntityField } from '../../entities/entity-field.entity';
import { UpdateEntityFieldDto } from './dtos/UpdateEntityFieldDto';
import { FieldType } from 'src/enums/field-type.enum';

@Injectable()
export class FieldsService {
  constructor(
    @InjectRepository(EntityField)
    private entityFieldsRepository: Repository<EntityField>,
  ) {}

  async add(
    entityId: string,
    { name, type, groupId, data }: CreateEntityFieldDto,
  ) {
    const entityField = new EntityField();

    entityField.entityId = entityId;
    entityField.name = name;
    entityField.type = type;
    entityField.groupId = groupId;
    entityField.data = data;

    if (type === FieldType.Enum && !data.enum)
      throw new ConflictException('enum must have enum data');

    await this.entityFieldsRepository.insert(entityField);

    return entityField;
  }

  async getAll(entityId: string, groupId?: string) {
    return this.entityFieldsRepository.find({
      where: [
        { entityId, groupId: IsNull() },
        { entityId, groupId },
      ],
      order: {
        createdAt: 'ASC',
      },
      select: {
        id: true,
        name: true,
        type: true,
        data: {
          enum: true,
        },
        groupId: true,
      },
    });
  }

  async update(fieldId: string, { name, type, groupId }: UpdateEntityFieldDto) {
    return this.entityFieldsRepository.update(fieldId, { name, type, groupId });
  }

  async delete(fieldId: string) {
    return this.entityFieldsRepository.delete({
      id: fieldId,
    });
  }
}
