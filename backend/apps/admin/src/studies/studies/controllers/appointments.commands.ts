import { Body, Controller, Inject, Post, Query } from '@nestjs/common';
import { CreateAppointmentDto } from '../dtos/CreateAppointmentDto';
import { CreateAppointmentUseCase } from '../transactions/CreateAppointmentUseCase';
import { StudyQueryDto } from '../dtos/StudyQueryDto';

@Controller('studies')
export class AppointmentCommands {
  constructor(
    @Inject(CreateAppointmentUseCase)
    private readonly createAppointment: CreateAppointmentUseCase,
  ) {}

  @Post('createAppointment')
  create(
    @Query() { studyId }: StudyQueryDto,
    @Body() data: CreateAppointmentDto,
  ) {
    return this.createAppointment.execute({ data, studyId });
  }
}
