import { Provider } from '@nestjs/common';
import { GetStudyRelatedEntityUseCase } from '@admin/entities/application';
import {
  ENTITIES_REPOSITORY,
  GET_STUDY_RELATED_ENTITY_USE_CASE,
  IEntitiesRepository,
} from '@admin/entities/domain';

export const GetStudyRelatedEntityUseCaseProvider: Provider = {
  provide: GET_STUDY_RELATED_ENTITY_USE_CASE,
  useFactory(entitiesRepository: IEntitiesRepository) {
    return new GetStudyRelatedEntityUseCase(entitiesRepository);
  },
  inject: [ENTITIES_REPOSITORY],
};
