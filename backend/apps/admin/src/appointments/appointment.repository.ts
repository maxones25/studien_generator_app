import { AppointmentSchema } from '@entities/schema';
import { InjectRepository } from '@nestjs/typeorm';
import { IsNull, Repository } from 'typeorm';
import { Appointment } from '@entities/core/appointment/Appointment';
import { IStudyAppointmentsRepository } from '@admin/studies/studies/domain/IStudyAppointmentsRepository';
import { IParticipantAppointmentsRepository } from '@admin/participants/participants/domain/IParticipantAppointmentsRepository';
import { CreateAppointmentDto } from './dtos/CreateAppointmentDto';

export class AppointmentsRepository
  implements
    IStudyAppointmentsRepository,
    IParticipantAppointmentsRepository
{
  constructor(
    @InjectRepository(AppointmentSchema)
    private readonly appointmentsRepository: Repository<AppointmentSchema>,
  ) {}

  async getStudyAppointments(studyId: string): Promise<Appointment[]> {
    const items = await this.appointmentsRepository.find({
      where: { studyId, groupId: IsNull(), participantId: IsNull() },
    });
    return items as Appointment[];
  }

  async getGroupAppointments(
    studyId: string,
    groupId: string,
  ): Promise<Appointment[]> {
    const items = await this.appointmentsRepository.find({
      where: [
        { studyId, groupId: IsNull(), participantId: IsNull() },
        { studyId: IsNull(), groupId, participantId: IsNull() },
      ],
    });
    return items as Appointment[];
  }

  async getParticipantAppointments(
    studyId: string,
    groupId: string,
    participantId: string,
  ): Promise<Appointment[]> {
    const items = await this.appointmentsRepository.find({
      where: [
        { studyId, groupId: IsNull(), participantId: IsNull() },
        { studyId: IsNull(), groupId, participantId: IsNull() },
        { studyId: IsNull(), groupId: IsNull(), participantId },
      ],
    });
    return items as Appointment[];
  }

  async createStudyAppointment(
    studyId,
    { startDate, endDate, endTime, startTime, subject }: CreateAppointmentDto,
  ): Promise<string> {
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

  async createGroupAppointment(
    groupId,
    {
      startDate,
      endDate,
      endTime,
      startTime,
      subject,
      originId,
    }: CreateAppointmentDto,
  ): Promise<string> {
    const appointment = new AppointmentSchema();

    appointment.groupId = groupId;
    appointment.startDate = startDate;
    appointment.startTime = startTime;
    appointment.endDate = endDate;
    appointment.endTime = endTime;
    appointment.subject = subject;
    appointment.originId = originId;

    await this.appointmentsRepository.insert(appointment);

    return appointment.id;
  }

  async createParticipantAppointment(
    participantId: string,
    {
      endDate,
      endTime,
      originId,
      startDate,
      startTime,
      subject,
    }: CreateAppointmentDto,
  ): Promise<string> {
    const appointment = new AppointmentSchema();

    appointment.participantId = participantId;
    appointment.startDate = startDate;
    appointment.startTime = startTime;
    appointment.endDate = endDate;
    appointment.endTime = endTime;
    appointment.subject = subject;
    appointment.originId = originId;

    await this.appointmentsRepository.insert(appointment);

    return appointment.id;
  }

  async deleteAppointment(id: string) {
    const { affected } = await this.appointmentsRepository.delete(id);
    return affected;
  }
}
