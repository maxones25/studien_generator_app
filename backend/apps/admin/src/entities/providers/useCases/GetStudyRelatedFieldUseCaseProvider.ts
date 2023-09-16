import { GetStudyRelatedFieldUseCase } from '@admin/entities/application';
import {
  ENTITIES_REPOSITORY,
  GET_STUDY_RELATED_FIELD_USE_CASE,
  IEntitiesRepository,
} from '@admin/entities/domain';
import { Provider } from '@nestjs/common';

export const GetStudyRelatedFieldUseCaseProvider: Provider = {
  provide: GET_STUDY_RELATED_FIELD_USE_CASE,
  useFactory(entitiesRepository: IEntitiesRepository) {
    return new GetStudyRelatedFieldUseCase(entitiesRepository);
  },
  inject: [ENTITIES_REPOSITORY],
};
