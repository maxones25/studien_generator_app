import { GetFieldsByEntityUseCase } from '@admin/entities/application';
import {
  ENTITIES_REPOSITORY,
  GET_FIELDS_BY_ENTITY_USE_CASE,
  IEntitiesRepository,
} from '@admin/entities/domain';
import { Provider } from '@nestjs/common';

export const GetFieldsByEntityUseCaseProvider: Provider = {
  provide: GET_FIELDS_BY_ENTITY_USE_CASE,
  useFactory(entitiesRepository: IEntitiesRepository) {
    return new GetFieldsByEntityUseCase(entitiesRepository);
  },
  inject: [ENTITIES_REPOSITORY],
};
