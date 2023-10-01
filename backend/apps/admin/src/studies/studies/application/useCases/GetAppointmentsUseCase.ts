import { Appointment } from '@entities/core/appointment/Appointment';
import { IStudyAppointmentsRepository } from '../../domain';

export type GetAppointmentsInput = {
  studyId: string;
};

export class GetAppointmentsUseCase {
  constructor(
    private readonly appointmentsRepository: IStudyAppointmentsRepository,
  ) {}

  execute({ studyId }: GetAppointmentsInput): Promise<Appointment[]> {
    return this.appointmentsRepository.getStudyAppointments(studyId);
  }
}
