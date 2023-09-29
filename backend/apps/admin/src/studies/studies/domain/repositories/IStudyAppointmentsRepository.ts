import { Appointment } from '@entities/core/appointment/Appointment';
import { CreateAppointmentDto } from '../../infrastructure/http/dtos/CreateAppointmentDto';

export const STUDY_APPOINTMENTS_REPOSITORY = 'STUDY_APPOINTMENTS_REPOSITORY';

export interface IStudyAppointmentsRepository {
  getStudyAppointments(studyId: string): Promise<Appointment[]>;

  createStudyAppointment(
    studyId: string,
    { startDate, endDate, endTime, startTime, subject }: CreateAppointmentDto,
  ): Promise<string>;
}
