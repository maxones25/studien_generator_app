import {
  CreateAppointmentInput,
  ICreateAppointmentUseCase,
} from '../domain/ICreateAppointmentUseCase';
import { IParticipantAppointmentsRepository } from '../domain/IParticipantAppointmentsRepository';

export class CreateAppointmentUseCase implements ICreateAppointmentUseCase {
  constructor(
    private readonly appointmentsRepository: IParticipantAppointmentsRepository,
  ) {}

  execute({ data, participantId }: CreateAppointmentInput): Promise<string> {
    return this.appointmentsRepository.createParticipantAppointment(
      participantId,
      data,
    );
  }
}
