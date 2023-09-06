import { CreateAppointmentDto } from '@admin/appointments/dtos/CreateAppointmentDto';
import {
  Body,
  Controller,
  Inject,
  Post,
  Query,
  UseGuards,
} from '@nestjs/common';
import { ParticipantQueryDto } from '../dtos/ParticipantQueryDto';
import { CreateAppointmentUseCase } from '../transactions/CreateAppointmentUseCase';
import { ParticipantGuard } from '../guards/participant.guard';

@Controller('participants')
export class AppointmentsCommands {
  constructor(
    @Inject(CreateAppointmentUseCase)
    private readonly createAppointment: CreateAppointmentUseCase,
  ) {}

  @Post('createAppointment')
  @UseGuards(ParticipantGuard)
  create(
    @Query() { participantId }: ParticipantQueryDto,
    @Body() data: CreateAppointmentDto,
  ) {
    return this.createAppointment.execute({ participantId, data });
  }
}
