import { AddFormConfigUseCase } from '@admin/groups/application';
import {
  ADD_FORM_CONFIG_USE_CASE,
  GROUPS_REPOSITORY,
  IGroupsRepository,
} from '@admin/groups/domain';
import { Provider } from '@nestjs/common';

export const AddFormConfigUseCaseProvider: Provider = {
  provide: ADD_FORM_CONFIG_USE_CASE,
  useFactory(groupsRepository: IGroupsRepository) {
    return new AddFormConfigUseCase(groupsRepository);
  },
  inject: [GROUPS_REPOSITORY],
};
