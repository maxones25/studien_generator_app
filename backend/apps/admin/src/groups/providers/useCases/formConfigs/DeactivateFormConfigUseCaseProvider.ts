import { DeactivateFormConfigUseCase } from '@admin/groups/application';
import {
  DEACTIVATE_FORM_CONFIG_USE_CASE,
  GROUPS_REPOSITORY,
  IGroupsRepository,
} from '@admin/groups/domain';
import { Provider } from '@nestjs/common';

export const DeactivateFormConfigUseCaseProvider: Provider = {
  provide: DEACTIVATE_FORM_CONFIG_USE_CASE,
  useFactory(groupsRepository: IGroupsRepository) {
    return new DeactivateFormConfigUseCase(groupsRepository);
  },
  inject: [GROUPS_REPOSITORY],
};
