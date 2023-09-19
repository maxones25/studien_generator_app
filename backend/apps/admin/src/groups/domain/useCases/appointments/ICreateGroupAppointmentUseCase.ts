import { GroupAppointment } from '@entities/core/appointment';
import { CreateDto } from '@entities/modules/core';
import { Id } from '@shared/modules/core';
import { UseCase } from '@shared/modules/core/UseCase';

export const CREATE_GROUP_APPOINTMENT_USE_CASE =
  'CREATE_GROUP_APPOINTMENT_USE_CASE';

export type CreateGroupAppointmentInput = {
  data: Omit<
    CreateDto<GroupAppointment>,
    'studyId' | 'participantId' | 'originId'
  >;
};

export interface ICreateGroupAppointmentUseCase
  extends UseCase<CreateGroupAppointmentInput, Promise<Id>> {}
