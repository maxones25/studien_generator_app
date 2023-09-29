import { Query, Controller, Get, Inject, UseFilters } from '@nestjs/common';
import { ErrorFilter, StudyQueryDto } from '../infrastructure/http';
import { Roles } from '@admin/members/infrastructure/http';
import { GetAppointmentsUseCase } from '../application';

@Controller('studies')
@UseFilters(ErrorFilter)
export class AppointmentQueries {
  constructor(
    @Inject(GetAppointmentsUseCase)
    private readonly getAppointments: GetAppointmentsUseCase,
  ) {}

  @Get('appointments')
  @Roles('admin', 'employee')
  get(@Query() { studyId }: StudyQueryDto) {
    return this.getAppointments.execute({ studyId });
  }
}
