import { Inject, Injectable } from '@nestjs/common';
import { CreateFormDto } from '../dtos/CreateFormDto';
import { FormsRepository } from '../repositories/forms.repository';
import { CreateFormTransaction } from '../transactions/CreateFormTransaction';
import { StudyRelatedDataAccessor } from '@shared/modules/records/StudyRelatedDataAccessor';

@Injectable()
export class FormsService implements StudyRelatedDataAccessor {
  constructor(
    @Inject(FormsRepository)
    private formsRepository: FormsRepository,
    @Inject(CreateFormTransaction)
    private createFormTransaction: CreateFormTransaction,
  ) {}

  async getRelatedByStudy(studyId: string, id: string): Promise<any> {
    return this.formsRepository.getRelatedByStudy(studyId, id);
  }

  async getNonGroup(groupId: string) {
    return this.formsRepository.getNonGroup(groupId);
  }

  async create(studyId: string, data: CreateFormDto) {
    return this.createFormTransaction.run({ studyId, data });
  }

  async getAll(studyId: string) {
    return this.formsRepository.getAll(studyId);
  }

  async getById(id: string) {
    return this.formsRepository.getById(id);
  }

  async changeName(id: string, name: string) {
    return this.formsRepository.update(id, { name });
  }

  async delete(id: string) {
    return this.formsRepository.delete(id);
  }

  async getByEntity(entityId: string) {
    return this.formsRepository.getByEntity(entityId);
  }
}
