import { UpdateFieldUseCase } from '@admin/entities/application';
import {
  ENTITIES_REPOSITORY,
  IEntitiesRepository,
  UPDATE_FIELD_USE_CASE,
} from '@admin/entities/domain';
import { Provider } from '@nestjs/common';

export const UpdateFieldUseCaseProvider: Provider = {
  provide: UPDATE_FIELD_USE_CASE,
  useFactory(entitiesRepository: IEntitiesRepository) {
    return new UpdateFieldUseCase(entitiesRepository);
  },
  inject: [ENTITIES_REPOSITORY],
};
