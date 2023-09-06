import { CreateAppointmentDto } from '@admin/appointments/dtos/CreateAppointmentDto';
import { Appointment } from '@entities/core/appointment/Appointment';

export interface IParticipantAppointmentsRepository {
  getParticipantAppointments(
    studyId: string,
    groupId: string,
    participantId: string,
  ): Promise<Appointment[]>;

  createParticipantAppointment(
    participantId: string,
    data: CreateAppointmentDto,
  ): Promise<string>;

  deleteAppointment(id: string): Promise<number>;
}
