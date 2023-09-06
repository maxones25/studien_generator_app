import { CreateAppointmentDto } from '@admin/appointments/dtos/CreateAppointmentDto';
import { Body, Controller, Inject, Post, Query } from '@nestjs/common';
import { CreateAppointmentUseCase } from '../transactions/CreateAppointmentUseCase';
import { GroupQueryDto } from '../dtos/GroupQueryDto';

@Controller('groups')
export class AppointmentsCommands {
  constructor(
    @Inject(CreateAppointmentUseCase)
    private readonly createAppointment: CreateAppointmentUseCase,
  ) {}

  @Post('createAppointment')
  create(
    @Query() { groupId }: GroupQueryDto,
    @Body() data: CreateAppointmentDto,
  ) {
    return this.createAppointment.execute({ groupId, data });
  }
}
