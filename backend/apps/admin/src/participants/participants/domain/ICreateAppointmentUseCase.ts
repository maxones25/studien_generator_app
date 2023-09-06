import { CreateAppointmentDto } from '@admin/appointments/dtos/CreateAppointmentDto';
import { UseCase } from '@shared/modules/core/UseCase';

export type CreateAppointmentInput = {
    participantId: string;
    data: CreateAppointmentDto;
};

export interface ICreateAppointmentUseCase
  extends UseCase<CreateAppointmentInput, Promise<string>> {}
