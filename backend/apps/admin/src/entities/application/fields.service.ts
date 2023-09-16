import { Injectable, Inject } from '@nestjs/common';
import { IGetStudyRelatedDataUseCase } from '@shared/modules/records/StudyRelatedDataAccessor';
import { ENTITIES_REPOSITORY, IEntitiesRepository } from '../domain';

@Injectable()
export class FieldsService {
  constructor(
    @Inject(ENTITIES_REPOSITORY)
    private entitiesRepository: IEntitiesRepository,
  ) {}

  async getByEntity(entityId: string) {
    return this.entitiesRepository.getFieldsByEntity(entityId);
  }
}
