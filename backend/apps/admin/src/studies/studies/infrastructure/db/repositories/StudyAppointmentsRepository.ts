import { AppointmentSchema } from '@entities/schema';
import { InjectRepository } from '@nestjs/typeorm';
import { IsNull, Repository } from 'typeorm';
import { Appointment } from '@entities/core/appointment/Appointment';
import { IStudyAppointmentsRepository } from '@admin/studies/studies/domain';
import { CreateAppointmentDto } from '../../http';
import datetime from '@shared/modules/datetime/datetime';

export class StudyAppointmentsRepository
  implements IStudyAppointmentsRepository
{
  constructor(
    @InjectRepository(AppointmentSchema)
    private readonly appointmentsRepository: Repository<AppointmentSchema>,
  ) {}

  async deleteStudyAppointment(id: string): Promise<number> {
    const deletedAt = datetime.currentDate();
    const data = { deletedAt } as any;
    const { affected } = await this.appointmentsRepository.update(id, data);
    return affected;
  }

  async getStudyAppointments(studyId: string): Promise<Appointment[]> {
    const items = await this.appointmentsRepository.find({
      where: { studyId, groupId: IsNull(), participantId: IsNull() },
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
}
