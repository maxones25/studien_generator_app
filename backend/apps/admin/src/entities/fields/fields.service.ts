import { Injectable, Inject } from '@nestjs/common';
import { CreateEntityFieldDto } from './dtos/CreateEntityFieldDto';
import { UpdateEntityFieldDto } from './dtos/UpdateEntityFieldDto';
import { FieldsRepository } from './fields.repository';
import { StudyRelatedDataAccessor } from '@shared/modules/records/StudyRelatedDataAccessor';

@Injectable()
export class FieldsService implements StudyRelatedDataAccessor {
  constructor(
    @Inject(FieldsRepository)
    private fieldsRepository: FieldsRepository,
  ) {}

  getRelatedByStudy(studyId: string, id: string) {
    return this.fieldsRepository.getRelatedByStudy(studyId, id)
  }

  async add(entityId: string, { name, type }: CreateEntityFieldDto) {
    const field = await this.fieldsRepository.create({ entityId, name, type });

    return field.id;
  }

  async getByEntity(entityId: string) {
    return this.fieldsRepository.getByEntity(entityId);
  }

  async update(fieldId: string, { name, type }: UpdateEntityFieldDto) {
    return this.fieldsRepository.update(fieldId, { name, type });
  }

  async delete(fieldId: string) {
    return this.fieldsRepository.delete({
      id: fieldId,
    });
  }
}
