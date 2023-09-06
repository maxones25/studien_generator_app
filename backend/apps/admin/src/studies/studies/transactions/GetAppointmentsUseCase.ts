import { Appointment } from '@entities/core/appointment/Appointment';
import { AppointmentsRepository } from '../repositories/appointment.repository';

export type GetAppointmentsInput = {
  studyId: string;
};

export class GetAppointmentsUseCase {
  constructor(
    private readonly appointmentsRepository: AppointmentsRepository,
  ) {}

  execute({ studyId }: GetAppointmentsInput): Promise<Appointment[]> {
    return this.appointmentsRepository.getStudyAppointments(studyId);
  }
}
