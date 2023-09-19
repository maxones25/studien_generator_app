import {
  CREATE_GROUP_APPOINTMENT_USE_CASE,
  GROUPS_REPOSITORY,
  IGroupsRepository,
} from '@admin/groups/domain';
import { CreateGroupAppointmentUseCase } from '@admin/groups/application';
import { Provider } from '@nestjs/common';

export const CreateGroupAppointmentUseCaseProvider: Provider = {
  provide: CREATE_GROUP_APPOINTMENT_USE_CASE,
  useFactory(groupsRepository: IGroupsRepository) {
    return new CreateGroupAppointmentUseCase(groupsRepository);
  },
  inject: [GROUPS_REPOSITORY],
};
