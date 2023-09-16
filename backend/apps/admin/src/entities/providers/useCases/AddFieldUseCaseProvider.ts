import { AddFieldUseCase } from '@admin/entities/application';
import {
  ADD_FIELD_USE_CASE,
  ENTITIES_REPOSITORY,
  IEntitiesRepository,
} from '@admin/entities/domain';
import { Provider } from '@nestjs/common';

export const AddFieldUseCaseProvider: Provider = {
  provide: ADD_FIELD_USE_CASE,
  useFactory(entitiesRepository: IEntitiesRepository) {
    return new AddFieldUseCase(entitiesRepository);
  },
  inject: [ENTITIES_REPOSITORY],
};
