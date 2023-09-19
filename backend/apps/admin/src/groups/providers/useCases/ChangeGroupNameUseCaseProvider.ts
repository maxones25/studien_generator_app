import { ChangeGroupNameUseCase } from '@admin/groups/application';
import { CHANGE_GROUP_NAME_USE_CASE } from '@admin/groups/domain';
import { Provider } from '@nestjs/common';

export const ChangeGroupNameUseCaseProvider: Provider = {
  provide: CHANGE_GROUP_NAME_USE_CASE,
  useFactory() {
    return new ChangeGroupNameUseCase();
  },
  inject: [],
};
