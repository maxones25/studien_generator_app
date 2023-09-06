import { CreateAppointmentDto } from '@admin/appointments/dtos/CreateAppointmentDto';
import { Group } from '@entities/core/group/Group';
import { UseCase } from '@shared/modules/core/UseCase';

export type CreateAppointmentInput = {
  groupId: string;
  data: CreateAppointmentDto;
};

export interface ICreateAppointmentUseCase
  extends UseCase<CreateAppointmentInput, Promise<string>> {}
