import { ActivateFormConfigUseCase } from '@admin/groups/application';
import {
  ACTIVATE_FORM_CONFIG_USE_CASE,
  GROUPS_REPOSITORY,
  IGroupsRepository,
} from '@admin/groups/domain';
import { Provider } from '@nestjs/common';

export const ActivateFormConfigUseCaseProvider: Provider = {
  provide: ACTIVATE_FORM_CONFIG_USE_CASE,
  useFactory(groupsRepository: IGroupsRepository) {
    return new ActivateFormConfigUseCase(groupsRepository);
  },
  inject: [GROUPS_REPOSITORY],
};
