import { Injectable, Inject } from '@nestjs/common';
import { FieldsRepository } from './repositories/fields.repository';
import { StudyRelatedDataAccessor } from '@shared/modules/records/StudyRelatedDataAccessor';

@Injectable()
export class FieldsService implements StudyRelatedDataAccessor {
  constructor(
    @Inject(FieldsRepository)
    private fieldsRepository: FieldsRepository,
  ) {}

  getRelatedByStudy(studyId: string, id: string) {
    return this.fieldsRepository.getRelatedByStudy(studyId, id);
  }

  async getByEntity(entityId: string) {
    return this.fieldsRepository.getByEntity(entityId);
  }
}
