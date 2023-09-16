import { Inject, Injectable } from '@nestjs/common';
import { ENTITIES_REPOSITORY, IEntitiesRepository } from '@admin/entities/domain';

@Injectable()
export class EntitiesService {
  constructor(
    @Inject(ENTITIES_REPOSITORY)
    private entitiesRepository: IEntitiesRepository,
  ) {}

  async getAll(studyId: string) {
    return this.entitiesRepository.getAll(studyId);
  }

  async getById(entityId: string) {
    return this.entitiesRepository.getById(entityId);
  }
}
