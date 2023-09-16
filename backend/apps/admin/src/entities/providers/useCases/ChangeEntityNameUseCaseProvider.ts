import { Provider } from '@nestjs/common';
import {
  CHANGE_ENTITY_NAME_USE_CASE,
  ENTITIES_REPOSITORY,
  IEntitiesRepository,
} from '@admin/entities/domain';
import { ChangeEntityNameUseCase } from '@admin/entities/application';

export const ChangeEntityNameUseCaseProvider: Provider = {
  provide: CHANGE_ENTITY_NAME_USE_CASE,
  useFactory(entitiesRepository: IEntitiesRepository) {
    return new ChangeEntityNameUseCase(entitiesRepository);
  },
  inject: [ENTITIES_REPOSITORY],
};
