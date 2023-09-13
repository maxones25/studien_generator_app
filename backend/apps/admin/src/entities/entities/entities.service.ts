import { Inject, Injectable } from '@nestjs/common';
import { EntitiesRepository } from './repositories/entities.repository';
import { StudyRelatedDataAccessor } from '@shared/modules/records/StudyRelatedDataAccessor';
import { IEntitiesRepository } from './domain/IEntitiesRepository';

@Injectable()
export class EntitiesService implements StudyRelatedDataAccessor {
  constructor(
    @Inject('IEntitiesRepository')
    private entitiesRepository: IEntitiesRepository,
  ) {}

  getRelatedByStudy(studyId: string, id: string) {
    return this.entitiesRepository.getRelatedByStudy(studyId, id);
  }

  async getAll(studyId: string) {
    return this.entitiesRepository.getAll(studyId);
  }

  async getById(entityId: string) {
    return this.entitiesRepository.getById(entityId);
  }
}
