import { GetStudyRelatedFormConfigUseCase } from '@admin/groups/application';
import {
  GET_STUDY_RELATED_FORM_CONFIG_USE_CASE,
  IGroupsRepository,
  GROUPS_REPOSITORY,
} from '@admin/groups/domain';
import { Provider } from '@nestjs/common';

export const GetStudyRelatedFormConfigUseCaseProvider: Provider = {
  provide: GET_STUDY_RELATED_FORM_CONFIG_USE_CASE,
  useFactory(groupsRepository: IGroupsRepository) {
    return new GetStudyRelatedFormConfigUseCase(groupsRepository);
  },
  inject: [GROUPS_REPOSITORY],
};
