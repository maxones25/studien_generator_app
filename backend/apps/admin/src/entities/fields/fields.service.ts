import { Injectable, Inject } from '@nestjs/common';
import { CreateFieldDto } from './dtos/CreateFieldDto';
import { UpdateFieldDto } from './dtos/UpdateFieldDto';
import { FieldsRepository } from './repositories/fields.repository';
import { StudyRelatedDataAccessor } from '@shared/modules/records/StudyRelatedDataAccessor';
import { AddFieldTransaction } from './transactions/AddFieldTransaction';
import { UpdateFieldTransaction } from './transactions/UpdateFieldTransaction';

@Injectable()
export class FieldsService implements StudyRelatedDataAccessor {
  constructor(
    @Inject(FieldsRepository)
    private fieldsRepository: FieldsRepository,
    @Inject(AddFieldTransaction)
    private addFieldTransaction: AddFieldTransaction,
    @Inject(UpdateFieldTransaction)
    private updateFieldTransaction: UpdateFieldTransaction,
  ) {}

  getRelatedByStudy(studyId: string, id: string) {
    return this.fieldsRepository.getRelatedByStudy(studyId, id);
  }

  async add(entityId: string, data: CreateFieldDto) {
    return this.addFieldTransaction.run({ entityId, data });
  }

  async getByEntity(
    entityId: string,
  ) {
    return this.fieldsRepository.getByEntity(entityId)
  }

  async update(fieldId: string, data: UpdateFieldDto) {
    return this.updateFieldTransaction.run({ fieldId, data });
  }

  async delete(fieldId: string) {
    return this.fieldsRepository.delete({
      id: fieldId,
    });
  }
}
