import { GroupAppointment } from '@entities/core/appointment';
import { Id } from '@shared/modules/core';
import { UseCase } from '@shared/modules/core/UseCase';

export const GET_GROUP_APPOINTMENTS_USE_CASE =
  'GET_GROUP_APPOINTMENTS_USE_CASE';

export type GetGroupAppointmentsUseCaseInput = {
  studyId: Id;
  groupId: Id;
};

export interface IGetGroupAppointmentsUseCase
  extends UseCase<
    GetGroupAppointmentsUseCaseInput,
    Promise<GroupAppointment[]>
  > {}
