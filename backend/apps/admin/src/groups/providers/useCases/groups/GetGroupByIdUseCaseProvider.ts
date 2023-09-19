import { GetGroupByIdUseCase } from '@admin/groups/application';
import {
  GET_GROUP_BY_ID_USE_CASE,
  GROUPS_REPOSITORY,
  IGroupsRepository,
} from '@admin/groups/domain';
import { Provider } from '@nestjs/common';

export const GetGroupByIdUseCaseProvider: Provider = {
  provide: GET_GROUP_BY_ID_USE_CASE,
  useFactory(groupsRepository: IGroupsRepository) {
    return new GetGroupByIdUseCase(groupsRepository);
  },
  inject: [GROUPS_REPOSITORY],
};
