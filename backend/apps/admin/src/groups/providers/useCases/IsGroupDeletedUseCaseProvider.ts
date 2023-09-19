import { IsGroupDeletedUseCase } from '@admin/groups/application';
import {
  GROUPS_REPOSITORY,
  IS_GROUP_DELETED_USE_CASE,
  IGroupsRepository,
} from '@admin/groups/domain';
import { Provider } from '@nestjs/common';

export const IsGroupDeletedUseCaseProvider: Provider = {
  provide: IS_GROUP_DELETED_USE_CASE,
  useFactory(groupsRepository: IGroupsRepository) {
    return new IsGroupDeletedUseCase(groupsRepository);
  },
  inject: [GROUPS_REPOSITORY],
};
