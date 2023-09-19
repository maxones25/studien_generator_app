import { RemoveFormConfigUseCase } from '@admin/groups/application';
import {
  GROUPS_REPOSITORY,
  REMOVE_FORM_CONFIG_USE_CASE,
  IGroupsRepository,
} from '@admin/groups/domain';
import { Provider } from '@nestjs/common';

export const RemoveFormConfigUseCaseProvider: Provider = {
  provide: REMOVE_FORM_CONFIG_USE_CASE,
  useFactory(groupsRepository: IGroupsRepository) {
    return new RemoveFormConfigUseCase(groupsRepository);
  },
  inject: [GROUPS_REPOSITORY],
};
