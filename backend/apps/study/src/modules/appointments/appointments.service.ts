import { Injectable } from '@nestjs/common';
import { IsNull, MoreThanOrEqual, Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { Appointment } from '@entities';

@Injectable()
export class AppointmentsService {
  constructor(
    @InjectRepository(Appointment)
    private appointmentsRepository: Repository<Appointment>,
  ) {}

  async findByParticipant(
    studyId: string,
    groupId: string,
    participantId: string,
  ) {
    const appointments = await this.appointmentsRepository.find({
      where: [
        { studyId, groupId: IsNull(), participantId: IsNull() },
        { studyId: IsNull(), groupId, participantId: IsNull() },
        { studyId: IsNull(), groupId: IsNull(), participantId },
      ],
    });
    return this.mapAppointments(appointments);
  }

  async findOneByIdForParticipant(appointmentId: string) {
    return await this.appointmentsRepository.findOne({ 
      where: { id: appointmentId } 
    });
  }

  async findModifiedSince(
    studyId: string,
    groupId: string,
    participantId: string,
    lastUpdated: Date,
  ) {
    const appointments = await this.appointmentsRepository.find({
      where: [
        { studyId, groupId: IsNull(), participantId: IsNull(), modifiedAt: MoreThanOrEqual(lastUpdated), },
        { studyId: IsNull(), groupId, participantId: IsNull(), modifiedAt: MoreThanOrEqual(lastUpdated), },
        { studyId: IsNull(), groupId: IsNull(), participantId, modifiedAt: MoreThanOrEqual(lastUpdated), },
      ],
    });
    return this.mapAppointments(appointments);
  }

  private mapAppointments(appointments: Appointment[]) {
    return appointments.map((appointment) => {
      return {
        id: appointment.id,
        start: appointment.startDate + 'T' + appointment.startTime,
        end: appointment.endDate + 'T' + appointment.endTime,
        name: appointment.subject,
      }
    })
  }
}
