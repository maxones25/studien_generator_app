import {
  GetGroupAppointmentsUseCaseInput,
  IGetGroupAppointmentsUseCase,
  IGroupsRepository,
} from '@admin/groups/domain';
import { GroupAppointment } from '@entities/core/appointment';

export class GetGroupAppointmentsUseCase implements IGetGroupAppointmentsUseCase {
  constructor(private readonly groupsRepository: IGroupsRepository) {}

  execute({
    groupId,
    studyId,
  }: GetGroupAppointmentsUseCaseInput): Promise<GroupAppointment[]> {
    return this.groupsRepository.getGroupAppointments(studyId, groupId);
  }
}
