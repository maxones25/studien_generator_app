import { Appointment } from '@entities/core/appointment/Appointment';
import { UseCase } from '@shared/modules/core/UseCase';

export type GetAppointmentsUseCaseInput = {
  studyId: string;
  groupId: string;
};

export interface IGetAppointmentsUseCase
  extends UseCase<GetAppointmentsUseCaseInput, Promise<Appointment[]>> {}
