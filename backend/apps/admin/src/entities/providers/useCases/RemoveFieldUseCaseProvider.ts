import {
  RemoveFieldUseCase,
} from '@admin/entities/application';
import {
  ENTITIES_REPOSITORY,
  IEntitiesRepository,
  REMOVE_FIELD_USE_CASE,
} from '@admin/entities/domain';
import { Provider } from '@nestjs/common';

export const RemoveFieldUseCaseProvider: Provider = {
  provide: REMOVE_FIELD_USE_CASE,
  useFactory(entitiesRepository: IEntitiesRepository) {
    return new RemoveFieldUseCase(entitiesRepository);
  },
  inject: [ENTITIES_REPOSITORY],
};
