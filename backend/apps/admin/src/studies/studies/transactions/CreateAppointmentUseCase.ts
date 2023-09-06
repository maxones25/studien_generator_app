import { CreateAppointmentDto } from '../dtos/CreateAppointmentDto';
import { AppointmentsRepository } from '../repositories/appointment.repository';

export type CreateAppointmentInput = {
  studyId: string;
  data: CreateAppointmentDto;
};

export class CreateAppointmentUseCase {
  constructor(
    private readonly appointmentsRepository: AppointmentsRepository,
  ) {}

  execute({ data, studyId }: CreateAppointmentInput): Promise<string> {
    return this.appointmentsRepository.createStudyAppointment(studyId, data);
  }
}
