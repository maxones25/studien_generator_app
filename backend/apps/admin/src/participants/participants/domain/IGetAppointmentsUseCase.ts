import { Appointment } from '@entities/core/appointment/Appointment';
import { UseCase } from '@shared/modules/core/UseCase';

export type GetAppointmentsInput = {
  studyId: string;
  groupId: string;
  participantId: string;
};

export interface IGetAppointmentsUseCase
  extends UseCase<GetAppointmentsInput, Promise<Appointment[]>> {}
