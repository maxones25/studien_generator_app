import { IDeleteAppointmentUseCase } from '../domain/IDeleteAppointmentUseCase';
import { IParticipantAppointmentsRepository } from '../domain/IParticipantAppointmentsRepository';

export class DeleteAppointmentUseCase implements IDeleteAppointmentUseCase {
  constructor(
    private readonly appointmentsRepository: IParticipantAppointmentsRepository,
  ) {}

  execute(appointmentId: string): Promise<number> {
    return this.appointmentsRepository.deleteAppointment(appointmentId);
  }
}
