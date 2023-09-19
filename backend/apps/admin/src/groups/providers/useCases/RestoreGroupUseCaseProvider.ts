import { RestoreGroupUseCase } from '@admin/groups/application';
import {
  GROUPS_REPOSITORY,
  RESTORE_GROUP_USE_CASE,
  IGroupsRepository,
} from '@admin/groups/domain';
import { Provider } from '@nestjs/common';

export const RestoreGroupUseCaseProvider: Provider = {
  provide: RESTORE_GROUP_USE_CASE,
  useFactory(groupsRepository: IGroupsRepository) {
    return new RestoreGroupUseCase(groupsRepository);
  },
  inject: [GROUPS_REPOSITORY],
};
