import { Query, Controller, Get, Inject } from '@nestjs/common';
import { StudyQueryDto } from '../dtos/StudyQueryDto';
import { GetAppointmentsUseCase } from '../transactions/GetAppointmentsUseCase';
import { Roles } from '@admin/roles/roles.decorator';

@Controller('studies')
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
