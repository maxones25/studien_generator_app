import { Appointment } from '@entities/core/appointment/Appointment';
import { CreateAppointmentDto } from '../dtos/CreateAppointmentDto';

export interface IStudyAppointmentsRepository {
  getStudyAppointments(studyId: string): Promise<Appointment[]>;

  createStudyAppointment(
    studyId: string,
    { startDate, endDate, endTime, startTime, subject }: CreateAppointmentDto,
  ): Promise<string>;
}
