import { CreateGroupUseCase } from '@admin/groups/application';
import { CREATE_GROUP_USE_CASE } from '@admin/groups/domain';
import { Provider } from '@nestjs/common';

export const CreateGroupUseCaseProvider: Provider = {
  provide: CREATE_GROUP_USE_CASE,
  useFactory() {
    return new CreateGroupUseCase();
  },
  inject: [],
};
