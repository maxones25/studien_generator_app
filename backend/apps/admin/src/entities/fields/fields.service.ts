import { Injectable, Inject, BadRequestException } from '@nestjs/common';
import { UpdateFieldDto } from './dtos/UpdateFieldDto';
import { FieldsRepository } from './fields.repository';
import { StudyRelatedDataAccessor } from '@shared/modules/records/StudyRelatedDataAccessor';
import { UpdateFieldTransaction } from './transactions/UpdateFieldTransaction';

@Injectable()
export class FieldsService implements StudyRelatedDataAccessor {
  constructor(
    @Inject(FieldsRepository)
    private fieldsRepository: FieldsRepository,
    @Inject(UpdateFieldTransaction)
    private updateFieldTransaction: UpdateFieldTransaction,
  ) {}

  getRelatedByStudy(studyId: string, id: string) {
    return this.fieldsRepository.getRelatedByStudy(studyId, id);
  }

  async getByEntity(entityId: string) {
    return this.fieldsRepository.getByEntity(entityId);
  }

  async update(fieldId: string, data: UpdateFieldDto) {
    if (Object.keys(data).length === 0) throw new BadRequestException();
    return this.updateFieldTransaction.run({ fieldId, data });
  }

  async delete(fieldId: string) {
    return this.fieldsRepository.hardDelete({
      id: fieldId,
    });
  }
}
