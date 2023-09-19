import {
  GET_GROUP_APPOINTMENTS_USE_CASE,
  GROUPS_REPOSITORY,
  IGroupsRepository,
} from '@admin/Groups/domain';
import { GetGroupAppointmentsUseCase } from '@admin/groups/application';
import { Provider } from '@nestjs/common';

export const GetGroupAppointmentUseCaseProvider: Provider = {
  provide: GET_GROUP_APPOINTMENTS_USE_CASE,
  useFactory(groupsRepository: IGroupsRepository) {
    return new GetGroupAppointmentsUseCase(groupsRepository);
  },
  inject: [GROUPS_REPOSITORY],
};
