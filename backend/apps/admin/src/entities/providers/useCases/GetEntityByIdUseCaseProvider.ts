import { GetEntityByIdUseCase } from '@admin/entities/application';
import {
  ENTITIES_REPOSITORY,
  GET_ENTITY_BY_ID_USE_CASE,
  IEntitiesRepository,
} from '@admin/entities/domain';
import { Provider } from '@nestjs/common';

export const GetEntityByIdUseCaseProvider: Provider = {
  provide: GET_ENTITY_BY_ID_USE_CASE,
  useFactory(entitiesRepository: IEntitiesRepository) {
    return new GetEntityByIdUseCase(entitiesRepository);
  },
  inject: [ENTITIES_REPOSITORY],
};
