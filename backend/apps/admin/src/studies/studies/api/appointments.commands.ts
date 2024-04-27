import {
  Body,
  Controller,
  Inject,
  Post,
  Query,
  UseFilters,
} from '@nestjs/common';
import {
  CreateAppointmentDto,
  StudyQueryDto,
  ErrorFilter,
} from '../infrastructure/http';
import { CreateAppointmentUseCase } from '../application';
import { Roles } from '@admin/studies/members/infrastructure/http';
import { AppointmentQueryDto } from '../infrastructure/http/dtos/AppointmentQueryDto';
import { DeleteAppointmentUseCase } from '../application/useCases/DeleteAppointmentUseCase';

@Controller('studies')
@UseFilters(ErrorFilter)
export class AppointmentCommands {
  constructor(
    @Inject(CreateAppointmentUseCase)
    private readonly createAppointment: CreateAppointmentUseCase,

    @Inject(DeleteAppointmentUseCase)
    private readonly deleteAppointment: DeleteAppointmentUseCase,
  ) {}

  @Post('createAppointment')
  @Roles('admin', 'employee')
  create(
    @Query() { studyId }: StudyQueryDto,
    @Body() data: CreateAppointmentDto,
  ) {
    return this.createAppointment.execute({ data, studyId });
  }

  @Post('deleteAppointment')
  @Roles('admin', 'employee')
  //guard missing
  delete(
    @Query() { appointmentId }: AppointmentQueryDto,
  ) {
    return this.deleteAppointment.execute( appointmentId );
  }
}
