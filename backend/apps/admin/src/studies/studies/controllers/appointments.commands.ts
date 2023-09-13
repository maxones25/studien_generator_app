import { Body, Controller, Inject, Post, Query } from '@nestjs/common';
import { CreateAppointmentDto } from '../dtos/CreateAppointmentDto';
import { CreateAppointmentUseCase } from '../transactions/CreateAppointmentUseCase';
import { StudyQueryDto } from '../dtos/StudyQueryDto';
import { Roles } from '@admin/roles/roles.decorator';

@Controller('studies')
export class AppointmentCommands {
  constructor(
    @Inject(CreateAppointmentUseCase)
    private readonly createAppointment: CreateAppointmentUseCase,
  ) {}

  @Post('createAppointment')
  @Roles("admin", "employee")
  create(
    @Query() { studyId }: StudyQueryDto,
    @Body() data: CreateAppointmentDto,
  ) {
    return this.createAppointment.execute({ data, studyId });
  }
}
