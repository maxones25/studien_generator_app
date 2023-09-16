import { CreateEntityUseCase } from '@admin/entities/application';
import {
  CREATE_ENTITY_USE_CASE,
  ENTITIES_REPOSITORY,
  IEntitiesRepository,
} from '@admin/entities/domain';
import { Provider } from '@nestjs/common';

export const CreateEntityUseCaseProvider: Provider = {
  provide: CREATE_ENTITY_USE_CASE,
  useFactory(entitiesRepository: IEntitiesRepository) {
    return new CreateEntityUseCase(entitiesRepository);
  },
  inject: [ENTITIES_REPOSITORY],
};
