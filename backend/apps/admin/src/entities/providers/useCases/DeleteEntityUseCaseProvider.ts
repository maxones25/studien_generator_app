import { DeleteEntityUseCase } from '@admin/entities/application';
import {
  DELETE_ENTITY_USE_CASE,
  ENTITIES_REPOSITORY,
  IEntitiesRepository,
} from '@admin/entities/domain';
import { Provider } from '@nestjs/common';

export const DeleteEntityUseCaseProvider: Provider = {
  provide: DELETE_ENTITY_USE_CASE,
  useFactory(entitiesRepository: IEntitiesRepository) {
    return new DeleteEntityUseCase(entitiesRepository);
  },
  inject: [ENTITIES_REPOSITORY],
};
