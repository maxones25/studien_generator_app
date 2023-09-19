import { CreateGroupUseCase } from '@admin/groups/application';
import {
  CREATE_GROUP_USE_CASE,
  GROUPS_REPOSITORY,
  IGroupsRepository,
} from '@admin/groups/domain';
import { Provider } from '@nestjs/common';

export const CreateGroupUseCaseProvider: Provider = {
  provide: CREATE_GROUP_USE_CASE,
  useFactory(groupsRepository: IGroupsRepository) {
    return new CreateGroupUseCase(groupsRepository);
  },
  inject: [GROUPS_REPOSITORY],
};
