import { AppointmentSchema } from '@entities/schema';
import { InjectRepository } from '@nestjs/typeorm';
import { IsNull, Repository } from 'typeorm';
import { Appointment } from '@entities/core/appointment/Appointment';
import { IStudyAppointmentsRepository } from '../domain/IStudyAppointmentsRepository';
import { IGroupAppointmentRepository } from '@admin/groups/domain/IGroupAppointmentRepository';
import { CreateAppointmentDto } from '@admin/appointments/dtos/CreateAppointmentDto';

export class AppointmentsRepository
  implements IStudyAppointmentsRepository, IGroupAppointmentRepository
{
  constructor(
    @InjectRepository(AppointmentSchema)
    private readonly appointmentsRepository: Repository<AppointmentSchema>,
  ) {}

  async createGroupAppointment(
    groupId: string,
    { startDate, endDate, endTime, startTime, subject }: CreateAppointmentDto,
  ): Promise<string> {
    const appointment = new AppointmentSchema();

    appointment.groupId = groupId;
    appointment.startDate = startDate;
    appointment.startTime = startTime;
    appointment.endDate = endDate;
    appointment.endTime = endTime;
    appointment.subject = subject;

    await this.appointmentsRepository.insert(appointment);

    return appointment.id;
  }

  async createStudyAppointment(
    studyId,
    { startDate, endDate, endTime, startTime, subject },
  ) {
    const appointment = new AppointmentSchema();

    appointment.studyId = studyId;
    appointment.startDate = startDate;
    appointment.startTime = startTime;
    appointment.endDate = endDate;
    appointment.endTime = endTime;
    appointment.subject = subject;

    await this.appointmentsRepository.insert(appointment);

    return appointment.id;
  }

  async getGroupAppointments(groupId: string): Promise<Appointment[]> {
    const items = await this.appointmentsRepository.find({
      where: { studyId: IsNull(), groupId, participantId: IsNull() },
    });
    return items as Appointment[];
  }

  async getStudyAppointments(studyId) {
    const items = await this.appointmentsRepository.find({
      where: { studyId, groupId: IsNull(), participantId: IsNull() },
    });
    return items as Appointment[];
  }
}
