import { GROUPS_REPOSITORY } from '@admin/groups/domain';
import { GroupsRepository } from '@admin/groups/infrastructure/db';
import { Provider } from '@nestjs/common';

export const GroupsRepositoryProvider: Provider = {
  provide: GROUPS_REPOSITORY,
  useClass: GroupsRepository,
};
