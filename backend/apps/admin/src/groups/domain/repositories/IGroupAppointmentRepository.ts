import { CreateAppointmentDto } from '@admin/studies/studies/infrastructure/http';
import { Appointment } from '@entities/core/appointment/Appointment';

export interface IGroupAppointmentRepository {
  getGroupAppointments(studyId: string, groupId: string): Promise<Appointment[]>;
  createGroupAppointment(
    groupId: string,
    data: CreateAppointmentDto,
  ): Promise<string>;
}
