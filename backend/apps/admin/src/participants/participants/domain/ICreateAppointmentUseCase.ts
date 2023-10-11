import { CreateAppointmentDto } from '@admin/studies/studies/infrastructure/http';
import { UseCase } from '@shared/modules/core/UseCase';

export type CreateAppointmentInput = {
    participantId: string;
    data: CreateAppointmentDto;
};

export interface ICreateAppointmentUseCase
  extends UseCase<CreateAppointmentInput, Promise<string>> {}
