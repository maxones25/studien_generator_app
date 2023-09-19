import { ChangeGroupNameUseCase } from '@admin/groups/application';
import {
  CHANGE_GROUP_NAME_USE_CASE,
  GROUPS_REPOSITORY,
  IGroupsRepository,
} from '@admin/groups/domain';
import { Provider } from '@nestjs/common';

export const ChangeGroupNameUseCaseProvider: Provider = {
  provide: CHANGE_GROUP_NAME_USE_CASE,
  useFactory(groupsRepository: IGroupsRepository) {
    return new ChangeGroupNameUseCase(groupsRepository);
  },
  inject: [GROUPS_REPOSITORY],
};
