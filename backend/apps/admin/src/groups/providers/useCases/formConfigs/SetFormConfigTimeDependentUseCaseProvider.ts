import { SetFormConfigTimeDependentUseCase } from '@admin/groups/application';
import {
  GROUPS_REPOSITORY,
  SET_FORM_CONFIG_TIME_DEPENDENT_USE_CASE,
  IGroupsRepository,
} from '@admin/groups/domain';
import { Provider } from '@nestjs/common';

export const SetFormConfigTimeDependentUseCaseProvider: Provider = {
  provide: SET_FORM_CONFIG_TIME_DEPENDENT_USE_CASE,
  useFactory(groupsRepository: IGroupsRepository) {
    return new SetFormConfigTimeDependentUseCase(groupsRepository);
  },
  inject: [GROUPS_REPOSITORY],
};
