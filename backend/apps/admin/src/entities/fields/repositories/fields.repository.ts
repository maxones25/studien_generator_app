import { EntityField } from '@entities';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { IFieldsRepository } from '../domain/IFieldsRepository';
import { CreateFieldDto } from '../domain/dtos/CreateFieldDto';
import { Id } from '@shared/modules/core/Id';
import { UpdateFieldDto } from '../domain/dtos/UpdateFieldDto';

export class FieldsRepository implements IFieldsRepository {
  constructor(
    @InjectRepository(EntityField)
    private readonly db: Repository<EntityField>,
  ) {}

  async deleteField(id: string): Promise<number> {
    const { affected } = await this.db.delete({ id });
    return affected;
  }

  async updateField(
    id: string,
    { name, type }: UpdateFieldDto,
  ): Promise<number> {
    const { affected } = await this.db.update({ id }, { name, type });
    return affected;
  }

  async createField(
    entityId: string,
    { name, type }: CreateFieldDto,
  ): Promise<Id> {
    const field = new EntityField();

    field.entityId = entityId;
    field.name = name;
    field.type = type;

    await this.db.insert(field);

    return field.id;
  }

  getRelatedByStudy(studyId: string, id: string) {
    return this.db.findOne({ where: { id, entity: { studyId } } });
  }

  async getByEntity(entityId: string) {
    return await this.db.find({
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
  }
}
