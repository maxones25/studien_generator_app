import { Controller, Get, Query } from '@nestjs/common';
import { ParticipantId } from '@study/decorators/participant-id.decorator';
import { AppointmentsService } from './appointments.service';
import { GroupId } from '@study/decorators/group-id.decorator';
import { StudyId } from '@study/decorators/study-id.decorator';

@Controller('appointments')
export class AppoinmentsController {
  constructor(private readonly appointmentsService: AppointmentsService) {}

  @Get()
  async getAppointments(
    @StudyId() studyId: string,
    @GroupId() groupId: string,
    @ParticipantId() participantId: string,
    @Query('appointmentId') appointmentId?: string,
    @Query('lastupdated') lastUpdated?: string
  ) {
    if (lastUpdated) {
      return await this.appointmentsService.findModifiedSince(
        studyId,
        groupId,
        participantId, 
        new Date(lastUpdated));
    }
    if (appointmentId) {
      return await this.appointmentsService.findOneByIdForParticipant(appointmentId);
    }
    return await this.appointmentsService.findByParticipant(
      studyId,
      groupId,
      participantId, 
    );
  }


}