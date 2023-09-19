import { GetStudyRelatedGroupUseCase } from '@admin/groups/application';
import {
  GET_STUDY_RELATED_GROUP_USE_CASE,
  GROUPS_REPOSITORY,
  IGroupsRepository,
} from '@admin/groups/domain';
import { Provider } from '@nestjs/common';

export const GetStudyRelatedGroupUseCaseProvider: Provider = {
  provide: GET_STUDY_RELATED_GROUP_USE_CASE,
  useFactory(groupsRepository: IGroupsRepository) {
    return new GetStudyRelatedGroupUseCase(groupsRepository);
  },
  inject: [GROUPS_REPOSITORY],
};
