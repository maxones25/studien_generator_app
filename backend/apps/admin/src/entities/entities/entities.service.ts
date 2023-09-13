import { Inject, Injectable } from '@nestjs/common';
import { EntitiesRepository } from './entities.repository';
import { StudyRelatedDataAccessor } from '@shared/modules/records/StudyRelatedDataAccessor';

@Injectable()
export class EntitiesService implements StudyRelatedDataAccessor {
  constructor(
    @Inject(EntitiesRepository)
    private entitiesRepository: EntitiesRepository,
  ) {}

  getRelatedByStudy(studyId: string, id: string) {
    return this.entitiesRepository.getRelatedByStudy(studyId, id);
  }

  async delete(entityId: string) {
    return await this.entitiesRepository.hardDelete(entityId);
  }

  async getAll(studyId: string) {
    return this.entitiesRepository.getAll(studyId);
  }

  async getById(entityId: string) {
    return this.entitiesRepository.getById(entityId);
  }
}
