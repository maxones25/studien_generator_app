import { CreateEntityUseCase } from '@admin/entities/application';
import { CREATE_ENTITY_USE_CASE } from '@admin/entities/domain';
import { Provider } from '@nestjs/common';

export const CreateEntityUseCaseProvider: Provider = {
  provide: CREATE_ENTITY_USE_CASE,
  useFactory() {
    return new CreateEntityUseCase();
  },
  inject: [],
};
