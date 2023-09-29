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
import { Roles } from '@admin/members/infrastructure/http';

@Controller('studies')
@UseFilters(ErrorFilter)
export class AppointmentCommands {
  constructor(
    @Inject(CreateAppointmentUseCase)
    private readonly createAppointment: CreateAppointmentUseCase,
  ) {}

  @Post('createAppointment')
  @Roles('admin', 'employee')
  create(
    @Query() { studyId }: StudyQueryDto,
    @Body() data: CreateAppointmentDto,
  ) {
    return this.createAppointment.execute({ data, studyId });
  }
}
