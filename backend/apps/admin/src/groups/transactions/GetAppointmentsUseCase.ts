import { Appointment } from '@entities/core/appointment/Appointment';
import {
  GetAppointmentsUseCaseInput,
  IGetAppointmentsUseCase,
} from '../domain/IGetAppointmentsUseCase';
import { IGroupAppointmentRepository } from '../domain/IGroupAppointmentRepository';

export class GetAppointmentsUseCase implements IGetAppointmentsUseCase {
  constructor(
    private readonly appointmentsRepository: IGroupAppointmentRepository,
  ) {}

  execute({
    groupId,
    studyId,
  }: GetAppointmentsUseCaseInput): Promise<Appointment[]> {
    return this.appointmentsRepository.getGroupAppointments(studyId, groupId);
  }
}
