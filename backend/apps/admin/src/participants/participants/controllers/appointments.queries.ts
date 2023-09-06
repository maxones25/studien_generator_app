import { Get, Inject, Controller, UseGuards } from '@nestjs/common';
import { GetAppointmentsUseCase } from '../transactions/GetAppointmentsUseCase';
import { GetParticipant } from '../participant.decorator';
import { Participant } from '@entities/core/participant/Participant';
import { ParticipantGuard } from '../guards/participant.guard';

@Controller('participants')
export class AppointmentsQueries {
  constructor(
    @Inject(GetAppointmentsUseCase)
    private readonly getAppointments: GetAppointmentsUseCase,
  ) {}

  @Get('appointments')
  @UseGuards(ParticipantGuard)
  get(@GetParticipant() participant: Participant) {
    return this.getAppointments.execute({
      studyId: participant.studyId,
      groupId: participant.groupId,
      participantId: participant.id,
    });
  }
}
