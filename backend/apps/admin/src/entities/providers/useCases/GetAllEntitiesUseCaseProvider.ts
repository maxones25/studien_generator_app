import { GetAllEntitiesUseCase } from '@admin/entities/application';
import {
  ENTITIES_REPOSITORY,
  GET_ALL_ENTITIES_USE_CASE,
  IEntitiesRepository,
} from '@admin/entities/domain';
import { Provider } from '@nestjs/common';

export const GetAllEntitiesUseCaseProvider: Provider = {
  provide: GET_ALL_ENTITIES_USE_CASE,
  useFactory(entitiesRepository: IEntitiesRepository) {
    return new GetAllEntitiesUseCase(entitiesRepository);
  },
  inject: [ENTITIES_REPOSITORY],
};
