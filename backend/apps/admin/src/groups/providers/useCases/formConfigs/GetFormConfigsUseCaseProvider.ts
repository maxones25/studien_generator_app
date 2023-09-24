import { GetFormConfigsUseCase } from '@admin/groups/application';
import {
  GET_FORM_CONFIGS_USE_CASE,
  GROUPS_REPOSITORY,
  IGroupsRepository,
} from '@admin/groups/domain';
import { Provider } from '@nestjs/common';

export const GetFormConfigsUseCaseProvider: Provider = {
  provide: GET_FORM_CONFIGS_USE_CASE,
  useFactory(groupsRepository: IGroupsRepository) {
    return new GetFormConfigsUseCase(groupsRepository);
  },
  inject: [GROUPS_REPOSITORY],
};
