import datetime from '@shared/modules/datetime/datetime';
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
    const start = datetime.convertToDateTime(data.startDate, data.startTime);
    const end = datetime.convertToDateTime(data.endDate, data.endTime);

    if(start.getTime() > end.getTime()) throw new Error("start must be before end");

    return this.appointmentsRepository.createStudyAppointment(studyId, data);
  }
}
