import { SetFormConfigTimeIndependentUseCase } from '@admin/groups/application';
import {
  GROUPS_REPOSITORY,
  IGroupsRepository,
  SET_FORM_CONFIG_TIME_INDEPENDENT_USE_CASE,
} from '@admin/groups/domain';
import { Provider } from '@nestjs/common';

export const SetFormConfigTimeIndependentUseCaseProvider: Provider = {
  provide: SET_FORM_CONFIG_TIME_INDEPENDENT_USE_CASE,
  useFactory(groupsRepository: IGroupsRepository) {
    return new SetFormConfigTimeIndependentUseCase(groupsRepository);
  },
  inject: [GROUPS_REPOSITORY],
};
