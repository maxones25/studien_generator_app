import {
  CreateGroupAppointmentInput,
  ICreateGroupAppointmentUseCase,
  IGroupsRepository,
} from '@admin/Groups/domain';
import { GroupAppointment } from '@entities/core/appointment';
import { Id } from '@shared/modules/core';

export class CreateGroupAppointmentUseCase
  implements ICreateGroupAppointmentUseCase
{
  constructor(private readonly groupsRepository: IGroupsRepository) {}

  execute({
    data: { groupId, subject, startDate, startTime, endDate, endTime },
  }: CreateGroupAppointmentInput): Promise<Id> {
    const appointment = new GroupAppointment({
      groupId,
      subject,
      startDate,
      startTime,
      endDate,
      endTime,
    });
    return this.groupsRepository.createGroupAppointment(appointment);
  }
}
