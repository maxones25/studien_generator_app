import { Appointment } from '@entities/core/appointment/Appointment';
import {
  GetAppointmentsInput,
  IGetAppointmentsUseCase,
} from '../domain/IGetAppointmentsUseCase';
import { IParticipantAppointmentsRepository } from '../domain/IParticipantAppointmentsRepository';

export class GetAppointmentsUseCase implements IGetAppointmentsUseCase {
  constructor(
    private readonly appointmentsRepository: IParticipantAppointmentsRepository,
  ) {}

  execute({
    studyId,
    groupId,
    participantId,
  }: GetAppointmentsInput): Promise<Appointment[]> {
    return this.appointmentsRepository.getParticipantAppointments(
      studyId,
      groupId,
      participantId,
    );
  }
}
