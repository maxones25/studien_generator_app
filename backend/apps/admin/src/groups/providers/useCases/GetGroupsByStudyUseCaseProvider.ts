import { GetGroupsByStudyUseCase } from '@admin/groups/application';
import {
  GET_GROUPS_BY_STUDY_USE_CASE,
  GROUPS_REPOSITORY,
  IGroupsRepository,
} from '@admin/groups/domain';
import { Provider } from '@nestjs/common';

export const GetGroupsByStudyUseCaseProvider: Provider = {
  provide: GET_GROUPS_BY_STUDY_USE_CASE,
  useFactory(groupsRepository: IGroupsRepository) {
    return new GetGroupsByStudyUseCase(groupsRepository);
  },
  inject: [GROUPS_REPOSITORY],
};
